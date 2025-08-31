export const setup = () => {
  const loadAuth = import(/* webpackChunkName: 'bruker' */ './setupAuth');

  return {
    brukerService: loadAuth.then((module) => module.brukerService),

    handlelisteService: loadAuth.then(async ({ firebaseApp, auth }) => {
      const databaseModule = await import(
        /* webpackChunkName: 'handleliste' */ './FirebaseHandlelisteServiceImpl'
      );
      return databaseModule.firebaseHandlelisteServiceImpl(firebaseApp, auth);
    }),
  };
};
