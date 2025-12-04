export const scrollbarStyle = {
    "&::-webkit-scrollbar": {
        width: "15px",
    },
    "&::-webkit-scrollbar-track": {
        background: (theme: any) => theme.palette.table.rowOdd,
        borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
        background: (theme: any) => theme.palette.table.header,
        borderRadius: "10px",
        border: (theme: any) => `2px solid ${theme.palette.table.rowOdd}`,
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: (theme: any) => theme.palette.table.hover,
    },
};
