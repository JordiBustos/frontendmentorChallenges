function Right(x) {
  return {
    chain: (f) => f(x),
    map: (f) => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`,
  };
}

function Left(x) {
  return {
    chain: (f) => Left(x),
    map: (f) => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `Left(${x})`,
  };
}

export { Right, Left };