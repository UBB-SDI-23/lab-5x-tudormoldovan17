

export const AllCountries = () => {
    const Pagination = require('pagination-front-end')// or import Pagination from 'pagination-front-end' in typescript

    const drones = [
        {
            id: 3,
            image: 'https://robohash.org/fugaaperiamofficiis.jpg?size=50x50&set=set1',
            name: 'Gabbie',
            address: '559 Moose Street',
            battery: 15,
            max_speed: 37.7,
            average_speed: 18.7,
            status: 'flying',
            fly: 76,
        },
        {
            id: 4,
            image: 'https://robohash.org/quiavoluptatemillum.jpg?size=50x50&set=set1',
            name: 'Audrie',
            address: '9460 Canary Junction',
            battery: 49,
            max_speed: 19.4,
            average_speed: 19.1,
            status: 'flying',
            fly: 26,
        },
        {
            id: 5,
            image: 'https://robohash.org/liberoperferendissapiente.jpg?size=50x50&set=set1',
            name: 'Doreen',
            address: '62 Rusk Avenue',
            battery: 56,
            max_speed: 35.7,
            average_speed: 22.8,
            status: 'flying',
            fly: 27,
        },
        {
            id: 6,
            image: 'https://robohash.org/quaecumqueid.bmp?size=50x50&set=set1',
            name: 'Gustaf',
            address: '687 Grim Place',
            battery: 70,
            max_speed: 38.7,
            average_speed: 1.6,
            status: 'flying',
            fly: 67,
        },
        {
            id: 7,
            image: 'https://robohash.org/omnisquiamet.jpg?size=50x50&set=set1',
            name: 'Othilie',
            address: '0249 Daystar Park',
            battery: 50,
            max_speed: 12.7,
            average_speed: 10.2,
            status: 'flying',
            fly: 41,
        },
        {
            id: 8,
            image: 'https://robohash.org/quiavoluptasut.png?size=50x50&set=set1',
            name: 'Rosene',
            address: '7016 Shelley Circle',
            battery: 51,
            max_speed: 3.3,
            average_speed: 9.2,
            status: 'charging',
            fly: 35,
        },
        {
            id: 9,
            image: 'https://robohash.org/nonoccaecatitemporibus.bmp?size=50x50&set=set1',
            name: 'Franklin',
            address: '63991 Rigney Point',
            battery: 21,
            max_speed: 40.5,
            average_speed: 5,
            status: 'charging',
            fly: 0,
        },
        {
            id: 10,
            image: 'https://robohash.org/doloresnonsit.bmp?size=50x50&set=set1',
            name: 'Lynel',
            address: '3080 Ludington Alley',
            battery: 73,
            max_speed: 27.3,
            average_speed: 15.7,
            status: 'success',
            fly: 18,
        },
        {
            id: 11,
            image: 'https://robohash.org/adautemenim.bmp?size=50x50&set=set1',
            name: 'Gunar',
            address: '15295 Crowley Lane',
            battery: 86,
            max_speed: 37.5,
            average_speed: 14,
            status: 'flying',
            fly: 66,
        },
        {
            id: 12,
            image: 'https://robohash.org/quisdoloreearum.jpg?size=50x50&set=set1',
            name: 'Kasey',
            address: '064 Delaware Lane',
            battery: 51,
            max_speed: 3.2,
            average_speed: 9.1,
            status: 'repair',
            fly: 43,
        },
        {
            id: 13,
            image: 'https://robohash.org/rationenonpossimus.png?size=50x50&set=set1',
            name: 'Delly',
            address: '6533 Basil Crossing',
            battery: 67,
            max_speed: 25,
            average_speed: 28,
            status: 'flying',
            fly: 91,
        },
        {
            id: 14,
            image: 'https://robohash.org/suscipitvelofficiis.jpg?size=50x50&set=set1',
            name: 'Norma',
            address: '80060 Riverside Drive',
            battery: 16,
            max_speed: 18.9,
            average_speed: 3.6,
            status: 'repair',
            fly: 90,
        },
    ]
// Pagination.pagination(items: any[], currentPage: number = 1, pageSize: number = 20) 
    const paginationPage1 = Pagination.pagination(drones, 1, 5)

// Pagination.pagination(items: any[], currentPage: number = 1, pageSize: number = 20) 
    const paginationPage2 = Pagination.pagination(drones, 2, 5)

    return (
      paginationPage1
    );
    console.log(paginationPage1)
    /*
    {
      AllItems: 12,
      currentPage: 1,
      pageSize: 5,
      allPages: 2,
      startPage: 1,
      endPage: 2,
      startIndex: 0,
      endIndex: 4,
      pages: [ 1, 2 ],
      items: [
        {
          id: 3,
          image: 'https://robohash.org/fugaaperiamofficiis.jpg?size=50x50&set=set1',
          name: 'Gabbie',
          address: '559 Moose Street',
          battery: 15,
          max_speed: 37.7,
          average_speed: 18.7,
          status: 'flying',
          fly: 76
        },
        {
          id: 4,
          image: 'https://robohash.org/quiavoluptatemillum.jpg?size=50x50&set=set1',
          name: 'Audrie',
          address: '9460 Canary Junction',
          battery: 49,
          max_speed: 19.4,
          average_speed: 19.1,
          status: 'flying',
          fly: 26
        },
        {
          id: 5,
          image: 'https://robohash.org/liberoperferendissapiente.jpg?size=50x50&set=set1',
          name: 'Doreen',
          address: '62 Rusk Avenue',
          battery: 56,
          max_speed: 35.7,
          average_speed: 22.8,
          status: 'flying',
          fly: 27
        },
        {
          id: 6,
          image: 'https://robohash.org/quaecumqueid.bmp?size=50x50&set=set1',
          name: 'Gustaf',
          address: '687 Grim Place',
          battery: 70,
          max_speed: 38.7,
          average_speed: 1.6,
          status: 'flying',
          fly: 67
        },
        {
          id: 7,
          image: 'https://robohash.org/omnisquiamet.jpg?size=50x50&set=set1',
          name: 'Othilie',
          address: '0249 Daystar Park',
          battery: 50,
          max_speed: 12.7,
          average_speed: 10.2,
          status: 'flying',
          fly: 41
        }
      ]
    }
    */

    console.log(paginationPage2)
    /*
    {
      AllItems: 12,
      currentPage: 2,
      pageSize: 5,
      allPages: 2,
      startPage: 1,
      endPage: 2,
      startIndex: 5,
      endIndex: 9,
      pages: [ 1, 2 ],
      items: [
        {
          id: 8,
          image: 'https://robohash.org/quiavoluptasut.png?size=50x50&set=set1',
          name: 'Rosene',
          address: '7016 Shelley Circle',
          battery: 51,
          max_speed: 3.3,
          average_speed: 9.2,
          status: 'charging',
          fly: 35
        },
        {
          id: 9,
          image: 'https://robohash.org/nonoccaecatitemporibus.bmp?size=50x50&set=set1',
          name: 'Franklin',
          address: '63991 Rigney Point',
          battery: 21,
          max_speed: 40.5,
          average_speed: 5,
          status: 'charging',
          fly: 0
        },
        {
          id: 10,
          image: 'https://robohash.org/doloresnonsit.bmp?size=50x50&set=set1',
          name: 'Lynel',
          address: '3080 Ludington Alley',
          battery: 73,
          max_speed: 27.3,
          average_speed: 15.7,
          status: 'success',
          fly: 18
        },
        {
          id: 11,
          image: 'https://robohash.org/adautemenim.bmp?size=50x50&set=set1',
          name: 'Gunar',
          address: '15295 Crowley Lane',
          battery: 86,
          max_speed: 37.5,
          average_speed: 14,
          status: 'flying',
          fly: 66
        },
        {
          id: 12,
          image: 'https://robohash.org/quisdoloreearum.jpg?size=50x50&set=set1',
          name: 'Kasey',
          address: '064 Delaware Lane',
          battery: 51,
          max_speed: 3.2,
          average_speed: 9.1,
          status: 'repair',
          fly: 43
        }
      ]
    }
    */

//pegar somente os itens 
// get only the items
    console.log(paginationPage1.items)
    /*
     [
        {
          id: 3,
          image: 'https://robohash.org/fugaaperiamofficiis.jpg?size=50x50&set=set1',
          name: 'Gabbie',
          address: '559 Moose Street',
          battery: 15,
          max_speed: 37.7,
          average_speed: 18.7,
          status: 'flying',
          fly: 76
        },
        {
          id: 4,
          image: 'https://robohash.org/quiavoluptatemillum.jpg?size=50x50&set=set1',
          name: 'Audrie',
          address: '9460 Canary Junction',
          battery: 49,
          max_speed: 19.4,
          average_speed: 19.1,
          status: 'flying',
          fly: 26
        },
        {
          id: 5,
          image: 'https://robohash.org/liberoperferendissapiente.jpg?size=50x50&set=set1',
          name: 'Doreen',
          address: '62 Rusk Avenue',
          battery: 56,
          max_speed: 35.7,
          average_speed: 22.8,
          status: 'flying',
          fly: 27
        },
        {
          id: 6,
          image: 'https://robohash.org/quaecumqueid.bmp?size=50x50&set=set1',
          name: 'Gustaf',
          address: '687 Grim Place',
          battery: 70,
          max_speed: 38.7,
          average_speed: 1.6,
          status: 'flying',
          fly: 67
        },
        {
          id: 7,
          image: 'https://robohash.org/omnisquiamet.jpg?size=50x50&set=set1',
          name: 'Othilie',
          address: '0249 Daystar Park',
          battery: 50,
          max_speed: 12.7,
          average_speed: 10.2,
          status: 'flying',
          fly: 41
        }
      ]

    */
//pegar somente os itens 
// get only the items
    console.log(paginationPage2.items)

    /*
    [
        {
          id: 8,
          image: 'https://robohash.org/quiavoluptasut.png?size=50x50&set=set1',
          name: 'Rosene',
          address: '7016 Shelley Circle',
          battery: 51,
          max_speed: 3.3,
          average_speed: 9.2,
          status: 'charging',
          fly: 35
        },
        {
          id: 9,
          image: 'https://robohash.org/nonoccaecatitemporibus.bmp?size=50x50&set=set1',
          name: 'Franklin',
          address: '63991 Rigney Point',
          battery: 21,
          max_speed: 40.5,
          average_speed: 5,
          status: 'charging',
          fly: 0
        },
        {
          id: 10,
          image: 'https://robohash.org/doloresnonsit.bmp?size=50x50&set=set1',
          name: 'Lynel',
          address: '3080 Ludington Alley',
          battery: 73,
          max_speed: 27.3,
          average_speed: 15.7,
          status: 'success',
          fly: 18
        },
        {
          id: 11,
          image: 'https://robohash.org/adautemenim.bmp?size=50x50&set=set1',
          name: 'Gunar',
          address: '15295 Crowley Lane',
          battery: 86,
          max_speed: 37.5,
          average_speed: 14,
          status: 'flying',
          fly: 66
        },
        {
          id: 12,
          image: 'https://robohash.org/quisdoloreearum.jpg?size=50x50&set=set1',
          name: 'Kasey',
          address: '064 Delaware Lane',
          battery: 51,
          max_speed: 3.2,
          average_speed: 9.1,
          status: 'repair',
          fly: 43
        }
      ]

    */
}