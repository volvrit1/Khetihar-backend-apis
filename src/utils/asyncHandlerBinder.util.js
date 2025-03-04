const autoWrapAsyncHandlers = (controllerClass) => {
  Object.getOwnPropertyNames(controllerClass).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(controllerClass, key);

    if (descriptor && typeof descriptor.value === "function") {
      controllerClass[key] = asyncHandler(controllerClass[key]);
    }
  });

  return controllerClass;
};

export default autoWrapAsyncHandlers;
