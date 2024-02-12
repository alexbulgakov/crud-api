export const parseArguments = () => {
  const cleanProcessArgs = process.argv.slice(2);
  const args = Object.fromEntries(
    cleanProcessArgs.map((arg) => {
      const [key, value] = arg.split("=");
      return [key, value];
    })
  );

  return args;
};
