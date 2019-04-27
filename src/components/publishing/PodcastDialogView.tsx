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
  Input,
  InputLabel,
  FormControl
} from "@material-ui/core";
import { Category } from "../../models/publishing/Category";
import { Language } from "../../models/publishing/Language";

interface IProps {
  title: string;
  description: string;
  isExplicit: boolean;
  rssUrl: string;
  isUpdating: boolean;
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
      rssUrl,
      categories,
      languages,
      onTitleChanged,
      onCategoryChanged,
      onDescriptionChanged,
      onLanguageChanged,
      onExplicitChanged,
      onClose,
      onSubmit,
      isUpdating
    } = this.props;

    return (
      <Dialog open onClose={onClose}>
        <DialogTitle>Podcasts</DialogTitle>
        <DialogContent>
          {rssUrl.length > 0 && (
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="RSS URL"
              value={rssUrl}
              disabled
            />
          )}

          <TextField
            fullWidth
            label="Title"
            value={title}
            margin="normal"
            variant="outlined"
            onChange={e => onTitleChanged(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            margin="normal"
            variant="outlined"
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

          <FormControl style={{ marginTop: 12 }} fullWidth>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              value={category ? category.title : "Test"}
              onChange={e => onCategoryChanged(e.target.value)}
              input={<Input />}
              fullWidth
              inputProps={{
                name: "category",
                id: "category"
              }}
            >
              {categories.map(c => (
                <MenuItem key={c.id} value={c.title}>
                  {c.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth style={{ marginTop: 12 }}>
            <InputLabel htmlFor="language">Language</InputLabel>
            <Select
              value={language ? language.name : "Test"}
              onChange={e => onLanguageChanged(e.target.value)}
              input={<Input />}
              inputProps={{
                name: "language",
                id: "language"
              }}
            >
              {languages.map(c => (
                <MenuItem key={c.id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div style={{ margin: 8 }}>{this.props.children}</div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose} disabled={isUpdating}>
            Close
          </Button>
          <Button color="primary" onClick={onSubmit} disabled={isUpdating}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
