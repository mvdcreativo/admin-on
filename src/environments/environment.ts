// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: "http://on_api_v1.test/api/",


  ////ROUTES API
  routesCRUD: {
    products: "courses",
    states: "states",
    cities: "cities",
    countries: "countries",
    accounts: "accounts",
    municipalities: "municipalities",
    neighborhoods: "neighborhoods",
    categories: "categories",
    transactionTypes: "courses_sections",
    publications: "publications",
    currencies: "currencies",
    roles: "roles",
    length_units: "length_units",
    levels: "levels",
    instructors:"instructors",
    students: "students",
    adquired_skills: "adquired_skills",
    course_sections: "course_sections",
    lessons: "lessons",
    schedules: "schedules",
    users: "users",
    orders: "orders",
    enrollments:"enrollments"
  
  }


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
