const tableData = [
  {
    "First Name":
      "<a href='https://en.wikipedia.org/wiki/Shah_Rukh_Khan'>Sahrukh</a>",
    "Last Name": "Khan",
    About: `<ng-kit id="about">Sahrukh khan is <li>considered as king khan and he enjoys a great fan following</ng-kit>`,
    Email: "iamSahrukh@gmail.com",
    DOB: "9th Aug 1976",
    Salary: 2000000,
    Gender: "Male",
  },
  {
    "First Name":
      "<a href='https://en.wikipedia.org/wiki/Kareena_Kapoor'>Kareena</a>",
    "Last Name": "Kapoor",
    About: `<p id="about">Sahrukh khan is considered as king khan and he enjoys a great fan following</p>`,
    Email: "kareenakapoor@gmail.com",
    DOB: "2nd March 1980",
    Salary: 1000000,
    Gender: "Female",
  },
  {
    "First Name": "<a href='https://en.wikipedia.org/wiki/Alia_Bhatt'>Alia</a>",
    "Last Name": "Bhatt",
    About: `<p id="about">Sahrukh khan is considered as king khan and he enjoys a great fan following</p>`,
    Email: "aliabhatt@gmail.com",
    DOB: "21st Aug 1994",
    Salary: 1500000,
    Gender: "Female",
  },
  {
    "First Name":
      "<a href='https://en.wikipedia.org/wiki/Priyanka_Chopra'>Priyanka</a>",
    "Last Name": "Chopra",
    About: `<p id="about">Sahrukh khan is considered as king khan and he enjoys a great fan following</p>`,
    Email: "priyankachopra@gmail.com",
    DOB: "23st Jan 1994",
    Salary: 10000,
    Gender: "Female",
  },
  {
    "First Name":
      "<a href='https://en.wikipedia.org/wiki/Deepika_Padukone'>Deepika</a>",
    "Last Name": "Padukone",
    About: `<p id="about">Sahrukh khan is considered as king khan and he enjoys a great fan following</p>`,
    Email: "deepika.p@gmail.com",
    DOB: "14th Aug 1986",
    Salary: 500000,
    Gender: "Female",
  },
];

//2% is reserved for SL
const columnWidth = {
  "First Name": "10%",
  "Last Name": "10%",
  About: "30%",
  Email: "15%",
  DOB: "10%",
  Salary: "10%",
  Gender: "10%",
};
const HTMLFields = ["First Name"];
const collapsibleField = ["About"];
const collapsibleFieldLimit = 50;
const hiddenFields = ["Gender"];
const filterFields = ["Email", "Salary", "Gender"];
