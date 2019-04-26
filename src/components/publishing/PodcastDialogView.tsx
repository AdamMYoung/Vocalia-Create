import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { Category } from "../../models/publishing/Category";
import { Language } from "../../models/publishing/Language";

interface IProps {
  title: string;
  description: string;
  isExplicit: boolean;
  category: Category | null;
  language: Language | null;

  categories: Category[];
  languages: Language[];

  onTitleChanged: (title: string) => void;
  onDescriptionChanged: (description: string) => void;
  onCategoryChanged: (categoryId: number) => void;
  onLanguageChanged: (languageId: number) => void;
  onExplicitChanged: (isExplicit: boolean) => void;

  onClose: () => void;
  onSubmit: () => void;
}

export default class PodcastDialogView extends Component<IProps> {
  render() {
    const {
      title,
      description,
      category,
      language,
      isExplicit,
      categories,
      languages,
      onTitleChanged,
      onCategoryChanged,
      onDescriptionChanged,
      onLanguageChanged,
      onExplicitChanged,
      onClose,
      onSubmit
    } = this.props;

    return (
      <Dialog open onClose={onClose}>
        <DialogTitle>Podcasts</DialogTitle>
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

          <FormControlLabel
            control={
              <Checkbox
                checked={isExplicit}
                onChange={() => onExplicitChanged(!isExplicit)}
                color="primary"
              />
            }
            label="Is Explicit"
          />

          <Select
            value={category ? category.title : ""}
            onChange={e => onCategoryChanged(parseInt(e.target.value))}
          >
            {categories.map(c => (
              <MenuItem value={c.id}>{c.title}</MenuItem>
            ))}
          </Select>

          <Select
            value={language ? language.name : ""}
            onChange={e => onLanguageChanged(parseInt(e.target.value))}
          >
            {languages.map(c => (
              <MenuItem value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>

          {this.props.children}
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
