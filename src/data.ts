export const Data = {
    User: [
        { name: 'Kevin Kwok', joined: 'May 2018', id: '1', photos: ['im1'], posts: ['P1', 'P3'], friends: ['7', '2'] },
        { name: 'Guillermo Webster', joined: 'May 2013', id: '2', posts: ['P2'],  friends: ['1', '3', '7']},
        { name: 'Mark Zuckerberg', joined: 'Aug 2004', id: '4',  friends: ['3', '7'] },
        { name: 'Carl Sagan', joined: 'May 1996', id: '3', friends: ['4', '7', '2'] },
        { name: 'Stephen Carbide', joined: 'Jul 1988', id: '7', friends: ['1', '2', '4', '3']},
    ],
    Session: [
        { user: '1', cookie: 'asdf' }
    ],
    Post: [
        { id: 'P1', creator: '1', message: 'Hello world!', date: 'Five minutes ago', comments: ['C1', 'C2'] },
        { id: 'P3', creator: '1', message: 'That which I can not create, I do not understand.', date: '3/8/18', comments: ['C4'] },
        { id: 'P2', creator: '2', message: 'Woorlllddstaaaar!', date: '3/2/11' }
    ],
    Photo: [
        { id: 'im1', creator: '1', caption: 'wow such sun', url: 'https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg?auto=compress&cs=tinysrgb&dpr=2&h=70&w=160' }
    ],
    Comment: [
        { id: 'C1', author: '4', date: '1/2/04', message: 'F1rst P0st!' },
        { id: 'C2', author: '7', date: '1/3/04', message: 'Congrats!' },
        { id: 'C4', author: '3', date: '1/3/14', message: 'lol' }
    ]
}


