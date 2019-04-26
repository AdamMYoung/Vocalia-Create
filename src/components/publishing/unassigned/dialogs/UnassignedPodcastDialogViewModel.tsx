import React, { Component } from "react";
import PodcastDialogView from "../../PodcastDialogView";
import DataManager from "../../../../data/api/DataManager";
import { UnassignedPodcast } from "../../../../models/publishing/UnassignedPodcast";
import { Category } from "../../../../models/publishing/Category";
import { Language } from "../../../../models/publishing/Language";
import { PublishedPodcast } from "../../../../models/publishing/PublishedPodcast";

interface IProps {
  api: DataManager;
  podcast: UnassignedPodcast;

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

export default class UnassignedPodcastDialogViewModel extends Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      title: "",
      description: "",
      isExplicit: false,
      category: null,
      language: null,
      categories: [],
      languages: []
    };
  }

  /**
   * Gets the categories and languages.
   */
  async componentDidMount() {
    const { api } = this.props;

    var categories = await api.getCategories();
    if (categories) this.setState({ categories, category: categories[0] });

    var languages = await api.getLanguages();
    if (languages) this.setState({ languages, language: languages[0] });
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
          true,
          []
        )
      );
    onClose();
  };

  render() {
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
      />
    );
  }
}
