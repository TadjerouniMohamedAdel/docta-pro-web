export const login = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'my token', user: { username: 'mohamed' } });
    }, 2000);
  });
};
