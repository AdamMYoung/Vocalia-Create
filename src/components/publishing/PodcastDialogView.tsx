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
  Checkbox,
  Typography,
  NativeSelect,
  Input
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
  onCategoryChanged: (name: string) => void;
  onLanguageChanged: (name: string) => void;
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

          <Typography>Category</Typography>
          <NativeSelect
            value={category ? category.title : "Test"}
            onChange={e => onCategoryChanged(e.target.value)}
            input={<Input />}
            fullWidth
          >
            {categories.map(c => (
              <option key={c.id} value={c.title}>
                {c.title}
              </option>
            ))}
          </NativeSelect>

          <Typography>Language</Typography>
          <NativeSelect
            value={language ? language.name : "Test"}
            onChange={e => onLanguageChanged(e.target.value)}
            input={<Input />}
            fullWidth
          >
            {languages.map(c => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </NativeSelect>

          <div style={{ margin: 8 }}>{this.props.children}</div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={onSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
