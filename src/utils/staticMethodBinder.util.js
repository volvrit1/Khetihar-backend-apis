const autoBindStaticMethods = (controllerClass) => {
  const boundMethods = {};
  Object.getOwnPropertyNames(controllerClass)
    .filter((key) => typeof controllerClass[key] === "function")
    .forEach((key) => {
      boundMethods[key] = controllerClass[key].bind(controllerClass);
    });
  return boundMethods;
};

export default autoBindStaticMethods;
