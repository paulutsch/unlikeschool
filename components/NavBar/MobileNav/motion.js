const variants = {
  div: {
    open: {
      x: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
        duration: 0.2,
        easeIn: [1.0, 0.67, 0.2, 0.1],
      },
    },
    closed: {
      x: 300,
      transition: {
        y: { stiffness: 1000 },
        duration: 0.2,
      },
    },
  },
  item: {
    open: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        y: {
          stiffness: 1000,
          velocity: -100,
          duration: 0.2,
          easeIn: [1.0, 0.67, 0.2, 0.1],
        },
      },
    },
    closed: {
      x: 20,
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
        duration: 0.2,
      },
    },
  },
};

export { variants };
