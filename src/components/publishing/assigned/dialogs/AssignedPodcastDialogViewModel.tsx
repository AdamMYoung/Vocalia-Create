import React, { Component } from "react";
import { PublishedPodcast } from "../../../../models/publishing/PublishedPodcast";
import DataManager from "../../../../data/api/DataManager";
import PodcastDialogView from "../../PodcastDialogView";
import { Category } from "../../../../models/publishing/Category";
import { Language } from "../../../../models/publishing/Language";
import PodcastEpisodeDialogView from "./PodcastEpisodeDialogView";

interface IProps {
  api: DataManager;
  podcast: PublishedPodcast;

  onClose: () => void;
}

interface IState {
  title: string;
  description: string;
  isExplicit: boolean;
  category: Category | null;
  language: Language | null;

  categories: Category[];
  languages: Language[];
}

export default class AssignedPodcastDialogViewModel extends Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      title: props.podcast.title,
      description: props.podcast.description,
      category: null,
      language: null,
      isExplicit: props.podcast.isExplicit,
      categories: [],
      languages: []
    };
  }

  /**
   * Gets the categories and languages.
   */
  async componentDidMount() {
    const { api, podcast } = this.props;

    var categories = await api.getCategories();
    if (categories)
      this.setState({
        categories,
        category: podcast
          ? categories.filter(c => c.id == podcast.categoryId)[0]
          : categories[0]
      });

    var languages = await api.getLanguages();
    if (languages)
      this.setState({
        languages,
        language: podcast
          ? languages.filter(c => c.id == podcast.languageId)[0]
          : languages[0]
      });
  }

  /**
   * Called when the title changes.
   */
  private onTitleChanged = (title: string) => {
    this.setState({ title });
  };

  /**
   * Called when the description changes.
   */
  private onDescriptionChanged = (description: string) => {
    this.setState({ description });
  };

  /**
   * Called when the explicit flag changes.
   */
  private onExplicitChanged = (isExplicit: boolean) => {
    this.setState({ isExplicit });
  };

  /**
   * Called when the category changes.
   */
  private onCategoryChanged = (categoryId: number) => {
    const { categories } = this.state;

    if (categories)
      this.setState({
        category: categories.filter(c => c.id == categoryId)[0]
      });
  };

  /**
   * Called when the language changes.
   */
  private onLanguageChanged = (languageId: number) => {
    const { languages } = this.state;

    if (languages)
      this.setState({
        language: languages.filter(c => c.id == languageId)[0]
      });
  };

  /**
   * Called when the podcast is submitted.
   */
  private onSubmit = async () => {
    const { api, podcast, onClose } = this.props;
    const { title, description, language, category, isExplicit } = this.state;

    if (title && description && language && category)
      await api.updatePodcast(
        new PublishedPodcast(
          podcast.uid,
          category.id,
          language.id,
          title,
          description,
          podcast.imageUrl,
          isExplicit,
          podcast.isActive,
          podcast.episodes
        )
      );
    onClose();
  };

  render() {
    const { episodes } = this.props.podcast;

    return (
      <PodcastDialogView
        {...this.props}
        {...this.state}
        onTitleChanged={this.onTitleChanged}
        onDescriptionChanged={this.onDescriptionChanged}
        onCategoryChanged={this.onCategoryChanged}
        onLanguageChanged={this.onLanguageChanged}
        onExplicitChanged={this.onExplicitChanged}
        onSubmit={this.onSubmit}
      >
        <PodcastEpisodeDialogView episodes={episodes} />
      </PodcastDialogView>
    );
  }
}
