import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    table: {
      header: string;
      rowEven: string;
      rowOdd: string;
      hover: string;
      text: string;
      divider: string;
      border: string;
    };
  }

  interface PaletteOptions {
    table?: {
      header?: string;
      rowEven?: string;
      rowOdd?: string;
      hover?: string;
      text?: string;
      divider?: string;
      border?: string;
    };
  }
}
