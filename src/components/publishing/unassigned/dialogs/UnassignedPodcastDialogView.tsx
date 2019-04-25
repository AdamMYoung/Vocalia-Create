import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import { Category } from "../../../../models/publishing/Category";
import { Language } from "../../../../models/publishing/Language";
import { UnassignedPodcast } from "../../../../models/publishing/UnassignedPodcast";

interface IProps {
  podcast: UnassignedPodcast;

  title: string;
  description: string;
  category: Category;
  language: Language;

  categories: Category[];
  languages: Language[];

  onTitleChanged: (title: string) => void;
  onDescriptionChanged: (description: string) => void;
  onCategoryChanged: (category: Category) => void;
  onLanguageChanged: (language: Language) => void;

  onClose: () => void;
  onSubmit: () => void;
}

export default class UnassignedPodcastDialogView extends Component<IProps> {
  render() {
    const {
      podcast,
      title,
      description,
      category,
      language,
      categories,
      languages,
      onTitleChanged,
      onCategoryChanged,
      onDescriptionChanged,
      onLanguageChanged,
      onClose,
      onSubmit
    } = this.props;

    return (
      <Dialog open onClose={onClose}>
        <DialogTitle>{podcast.name}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={e => onTitleChanged(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={e => onDescriptionChanged(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onSubmit}>
            Submit
          </Button>
          <Button color="primary" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
