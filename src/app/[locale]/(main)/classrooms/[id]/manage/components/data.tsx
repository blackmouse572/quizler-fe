export async function getData(): Promise<Student[]> {
  // Fetch data from your API here.
  return [
    {
      id: "m5gr84i9",
      name: "Student 1",
      role: "Student",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      name: "Student 2",
      role: "Student",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      name: "Student 3",
      role: "Student",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      name: "Student 4",
      role: "Student",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      name: "Student 5",
      role: "Student",
      email: "carmella@hotmail.com",
    },
    {
      id: "m5gr84i9",
      name: "Student 1",
      role: "Student",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      name: "Student 2",
      role: "Student",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      name: "Student 3",
      role: "Student",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      name: "Student 4",
      role: "Student",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      name: "Student 5",
      role: "Student",
      email: "carmella@hotmail.com",
    },
    {
      id: "m5gr84i9",
      name: "Student 1",
      role: "Student",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      name: "Student 2",
      role: "Student",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      name: "Student 3",
      role: "Student",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      name: "Student 4",
      role: "Student",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      name: "Student 5",
      role: "Student",
      email: "carmella@hotmail.com",
    },
  ]
}

export type Student = {
  id: string
  name: string
  role: string
  email: string
}
