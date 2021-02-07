const CMSC131 = {
  id: "CMSC131",
  instructor: "Anwar Mamat",
  description: "Object-Oriented Programming I",
  projects: [],
};

const CMSC132 = {
  id: "CMSC132",
  instructor: "Fawzi Emad",
  description: "Object-Oriented Programming II",
  projects: [
    {
      projid: 1,
      title: "Project 1",
      due: "3/19/2020",
      submissions: [
        {
          dirid: "tbeal",
          ts: new Date(),
          file: null,
        },
      ],
    },
  ],
};

const CMSC216 = {
  id: "CMSC216",
  instructor: "Nelson Padua-Perez",
  description: "Introduction to Computer Systems",
  projects: [
    {
      projid: 1,
      title: "Project 1",
      due: "3/19/2020",
      submissions: [],
    },
    {
      projid: 2,
      title: "Project 2",
      due: "3/19/2020",
      submissions: [
        {
          dirid: "kbeal",
          ts: new Date(),
          number: 1,
          file: null,
        },
        {
          dirid: "tbeal",
          ts: new Date(),
          number: 1,
          file: null,
        },
        {
          dirid: "tbeal",
          ts: new Date(),
          number: 2,
          file: null,
        },
        {
          dirid: "tbeal",
          ts: new Date(),
          number: 3,
          file: null,
        },
        {
          dirid: "tbeal",
          ts: new Date(),
          number: 4,
          file: null,
        },
      ],
    },
  ],
};

const courses = {
  2020: {
    winter: [],
    spring: [],
    summer: [CMSC131, CMSC132, CMSC216],
    fall: [],
  },
  2019: {
    winter: [],
    spring: [],
    summer: [],
    fall: [],
  },
};

const student = {
  dirid: "tbeal",
  courses: courses,
};

export { student };
