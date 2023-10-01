export const getCustomStyles = (theme: 'light' | 'dark') => {
  return {
    content: {
      maxWidth: '500px',
      maxHeight: '470px',
      margin: 'auto',
      padding: '20px',
      backgroundColor: theme === 'light' ? '#FDFDFD' : '#6f6464'
    }
  };
};
