const locations = [
    {
      latitude: 54.725607,
      longitude: 20.5382,
      name: 'ул. Куйбышева, 109-111, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.722987,
      longitude: 20.474968,
      name: 'ул. Красная, 45, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.713065,
      longitude: 20.442916,
      name: 'ул. Красносельская, 45 ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.669535,
      longitude: 20.504424,
      name: 'Южный рынок, ул. Интернациональная, 30, с 9:00 до 19:00',
    },
    {
      latitude: 54.713215,
      longitude: 20.50967,
      name: 'ул. Черняховского, 15, центральный рынок, молочный пав, место 23-24, с 8:00 до 19:00, последний понедельник месяца выходной',
    },
    {
      latitude: 54.713215,
      longitude: 20.50967,
      name: 'ул. Университетская, 2 а,  ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.711063,
      longitude: 20.567718,
      name: 'ул. Кутаисская, 1, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.70904,
      longitude: 20.50815,
      name: 'ул. Б. Хмельницкого, 71, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.70904,
      longitude: 20.50815,
      name: 'ул. Багратиона, 96, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.674116,
      longitude: 20.482577,
      name: 'ул. Коммунистическая, 34, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.694202,
      longitude: 20.456238,
      name: 'ул. Киевская, 80, Балтийский рынок, ежедневно с 8:00 до 17:00, первый понедельник месяца выходной',
    },
    {
      latitude: 54.742814,
      longitude: 20.490626,
      name: 'ул. Челнокова, 21 рынок микрорайона Сельма, рынок с 9:00 до 18:00, второй понедельник месяца выходной',
    },
    {
      latitude: 54.73602,
      longitude: 20.508996,
      name: 'ул. Озёрная, 1а, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.710386,
      longitude: 20.530115,
      name: 'Московский рынок, ул. Дзержинского, 79',
    },
    {
      latitude: 54.726845,
      longitude: 20.476917,
      name: 'ул. Камская, 6 с 9:00 до 15:00, воскресенье, понедельник – выходной',
    },
    {
      latitude: 54.749178,
      longitude: 20.501649,
      name: 'ул. Горького, 170, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.730229,
      longitude: 20.533754,
      name: 'ул. Дадаева, 62, пав. 3, ежедневно с 7:30 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.708482,
      longitude: 20.498872,
      name: 'ул. Мариупольская, 14 ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.711473,
      longitude: 20.577573,
      name: 'ул. Карла Маркса, 33 ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.666327,
      longitude: 20.508206,
      name: 'ул. Карамзина, 33, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.66555,
      longitude: 20.54611,
      name: 'ул. Емельянова, 282, пос. Борисово, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.73529,
      longitude: 20.47121,
      name: 'ул. Захарова, 2а пересечен. с ул. Пацаева, с 7:00 до 12:00 воскресенье, понедельник - выходной',
    },
    {
      latitude: 54.708482,
      longitude: 20.498872,
      name: 'ул. Мариупольская, 14 ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.711473,
      longitude: 20.577573,
      name: 'ул. Карла Маркса, 33 ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.666327,
      longitude: 20.508206,
      name: 'ул. Карамзина, 33, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.66555,
      longitude: 20.54611,
      name: 'ул. Емельянова, 282, пос. Борисово, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.73529,
      longitude: 20.47121,
      name: 'ул. Захарова, 2а, пересечение с ул. Пацаева, с 7:00 до 12:00 воскресенье, понедельник - выходной',
    },
    {
      latitude: 54.72658,
      longitude: 20.51248,
      name: 'ул. Мусоргского, 8, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.714515,
      longitude: 20.518985,
      name: 'ул. Беланова, 29, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.71251,
      longitude: 20.50649,
      name: 'ул. Невского, 52а, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.719248,
      longitude: 20.486647,
      name: 'ул. Полоцкая, 22, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.731433,
      longitude: 20.480124,
      name: 'ул. Миклухо-Маклая, 10, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.66891,
      longitude: 20.510281,
      name: 'Московский рынок, ул. Дзержинского, 79',
    },
    {
      latitude: 54.704347,
      longitude: 20.54265,
      name: 'ул. Камская, 63, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.744003,
      longitude: 20.493312,
      name: 'ул. Артиллерийская, 63, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.675262,
      longitude: 20.510326,
      name: 'ул. Батальная, 75, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.736348,
      longitude: 20.462868,
      name: 'ул. Борзова, 74, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.679072,
      longitude: 20.503552,
      name: 'ул. Машиностроительная, 62, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.673903,
      longitude: 20.494524,
      name: 'ул. Толстикова, 21, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.675605,
      longitude: 20.499564,
      name: 'ул. Батальная, 54 г, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.725264,
      longitude: 20.464026,
      name: 'ул. Каштановая аллея, 81, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.731742,
      longitude: 20.497893,
      name: 'ул. Нарвская, 46, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.71918,
      longitude: 20.605457,
      name: 'п. Исаково, ул. Октябрьская, 5, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.705111,
      longitude: 20.491578,
      name: 'ул. Портовая, 20в, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.742855,
      longitude: 20.465931,
      name: 'Советский проспект, 159, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.66891,
      longitude: 20.510281,
      name: 'ул. Интернациональная, 76 ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.66891,
      longitude: 20.510281,
      name: 'ул. Интернациональная, 79, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.734059,
      longitude: 20.579866,
      name: 'ул. Коммунистическая, 29, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.73179,
      longitude: 20.515295,
      name: 'ул. Заречная, 4, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.681579,
      longitude: 20.517173,
      name: 'ул. Шоссейная, 14, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.712018,
      longitude: 20.457806,
      name: 'ул. Громова, 15а, ТЦ "ГиперМаркет", ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.733161,
      longitude: 20.550827,
      name: 'п. Васильково, ул. Гвардейская, 37, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.737418,
      longitude: 20.515864,
      name: 'ул. Солнечная, 1, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.709578,
      longitude: 20.547885,
      name: 'ул. Седова, 6, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.734439,
      longitude: 20.545108,
      name: 'ул. Дзержинского, 51, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.708321,
      longitude: 20.565761,
      name: 'ул. Куйбышева, 97, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.744535,
      longitude: 20.534632,
      name: 'ул. Западная, 11, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.72946,
      longitude: 20.480754,
      name: 'ул. Чернышевского, 55, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.7402,
      longitude: 20.506614,
      name: 'ул. Андреева, 23, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.702578,
      longitude: 20.544866,
      name: 'ул. Советская, 24, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.750614,
      longitude: 20.573464,
      name: 'ул. Горького, 52, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.694251,
      longitude: 20.528164,
      name: 'ул. Западная, 38, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.712625,
      longitude: 20.487406,
      name: 'ул. Горького, 1а, ТЦ "КАРАВАН", ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.719245,
      longitude: 20.464318,
      name: 'ул. Калинина, 18, ТЦ "Москва", ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.741694,
      longitude: 20.461206,
      name: 'ул. Грязнова, 6, ТЦ "Грин-Маркет", ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.751214,
      longitude: 20.494425,
      name: 'ул. Адмирала Юмашева, 5, ТЦ "Семья", ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.594136,
      longitude: 22.202994,
      name: 'г. Гусев, ул. Московская, 17, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.59209607007103,
      longitude: 22.204126000000024,
      name: 'г. Советск, ул. Шевченко 1 б, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.62718807004365,
      longitude: 21.812811000000014,
      name: 'г. Славск, ул. Советская, 37, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 55.08158106961898,
      longitude: 21.905346499999943,
      name: 'г. Светлогорск, ул. Пионерская, 22 ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 55.080560069616354,
      longitude: 21.886077499999985,
      name: 'п. Прибрежный, ул. Заводская, 29 а, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.656704,
      longitude: 21.071225,
      name: 'г. Гвардейск, ул. Мира, 6,  ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.647302,
      longitude: 21.072958,
      name: 'г. Гвардейск, ул. Гагарина, 5 б, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 55.03734506968267,
      longitude: 22.03074199999996,
      name: 'г. Полесск, ул. Почтовая, 3, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.62829857001705,
      longitude: 22.57467199999997,
      name: 'п. Пионерский, ул. Донская, 5 а, ежедневно с 7:30 до 19:30 (14:00-14:30)',
    },
    {
      latitude: 54.6293,
      longitude: 22.574,
      name: 'г. Нестеров, ул. Черняховского, 38, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.941156569760345,
      longitude: 22.48933199999998,
      name: 'г. Нестеров, ул. Калинина, 10а ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.75523966658432,
      longitude: 22.351970299120953,
      name: 'г. Неман, ул. Красноармейская, 1, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.942439,
      longitude: 22.490284,
      name: 'Краснознаменский район, пос. Весново ул. Южная 1 а, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 55.038006,
      longitude: 22.031057,
      name: 'г. Краснознаменск, ул. Калининградская, д. 35, ежедневно с 8:00 до 19:00',
    },
    {
      latitude: 55.081663,
      longitude: 21.896363,
      name: 'г. Зеленоградск, ул. Тургенева, 1б ежедневно с 8.30 до 20.30 (14:00-14:30)',
    },
    {
      latitude: 54.781628,
      longitude: 20.608592,
      name: 'г. Гурьевск, ул. Безымянная, 4 а, "Птицефабрика Гурьевская", магазин ПФГ,  с 7:30 до 18:00, суббота с 8:00 до 16:00, воскресенье выходной',
    },
    {
      latitude: 54.77886,
      longitude: 20.595809,
      name: 'г. Гурьевск, ул. Крайняя, 3, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.774706,
      longitude: 20.604514,
      name: 'г. Гурьевск, ул. Новая, 3, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.592096,
      longitude: 22.204126,
      name: 'г. Гусев, ул. Толстого, 6, пн-пт с 8:00 до 17:30',
    },
    {
      latitude: 54.586806,
      longitude: 22.19667,
      name: 'г. Гусев, ул. Победы, 25, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.586274,
      longitude: 22.198422,
      name: 'г. Гусев, ул. Вокзальная, 1, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 55.08158106961898,
      longitude: 21.905346499999943,
      name: 'г. Советск, ул. Победы, 28, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 55.08158106961898,
      longitude: 21.905346499999943,
      name: 'г. Черняховск, ул. Победы, 44 а, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 55.08158106961898,
      longitude: 21.905346499999943,
      name: 'г. Черняховск, ул. Российская, 16, ежедневно с 8:00 до 20:00 (13:00-13:30)',
    },
    {
      latitude: 55.08158106961898,
      longitude: 21.905346499999943,
      name: 'г. Черняховск, ул. Пушкина, 1, пв-н №85, ежедневно с 8:00 до 19:00',
    },
    {
      latitude: 55.08158106961898,
      longitude: 21.905346499999943,
      name: 'г. Черняховск, ул. Курчатова, 8, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 55.08158106961898,
      longitude: 21.905346499999943,
      name: 'г. Черняховск, Ленинградская, 11, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 55.08158106961898,
      longitude: 21.905346499999943,
      name: 'г. Черняховск, ул. Садовая, 4, Центральный рынок, ежедневно с 7:00 до 18:00',
    },
    {
      latitude: 55.08158106961898,
      longitude: 21.905346499999943,
      name: 'г. Озёрск, ул Некрасова, 6, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 55.08158106961898,
      longitude: 21.905346499999943,
      name: 'г. Чкаловск, ул. Биланова, 29, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.633317,
      longitude: 21.816314,
      name: 'г. Черняховск, ул. Ленина, 20, ежедневно с 8.00 до 20.00',
    },
    {
      latitude: 20.13473,
      longitude: 54.67501,
      name: 'п. Луговое, ул. Центральная, 2ж, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 85.9998,
      longitude: 54.9998,
      name: 'г. Гурьевск, ул. Пражский бульвар, 1 а пом. 21, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 85.9998,
      longitude: 54.9998,
      name: 'г. Гурьевск, пер. Байдукова, 2а, рынок Гурьевска, суббота с 6:00 до 14:00',
    },
    {
      latitude: 20.13473,
      longitude: 54.67501,
      name: 'г Светлый, ул. Л. Чайкиной, 13, ежедневно с 8.00 до 20.00',
    },
    {
      latitude: 21.87851,
      longitude: 55.08392,
      name: 'г. Советск, ул. Ленина, 20, ежедневно с 8.00 до 20.00',
    },
    {
      latitude: 55.08158106961898,
      longitude: 21.905346499999943,
      name: 'г. Светлогорск, ул. Калининградский пр., 28 ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.941156569760345,
      longitude: 22.48933199999998,
      name: 'г. Нестеров, ул. Черняховского, 23 ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.774706,
      longitude: 20.604514,
      name: 'г. Гурьевск, ул. Калининградское шоссе, 3, ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.586274,
      longitude: 22.198422,
      name: 'г. Гусев, ул.Московская, 17, ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 20.13473,
      longitude: 54.67501,
      name: 'г. Светлый, ул. Коммунистическая, 3 а ежедневно с 8.00 до 20.00',
    },
    {
      latitude: 20.0,
      longitude: 54.75,
      name: 'п. Васильково, ул. Шатурская, 11',
    },
    {
      latitude: 20.14,
      longitude: 54.69,
      name: 'пос. Взморье, ул. Советская, 40 а',
    },
    {
      latitude: 19.9083333,
      longitude: 54.6544444,
      name: 'г. Балтийск, ул. Ленина, 65',
    },
    {
      latitude: 20.4766667,
      longitude: 54.9555556,
      name: 'г. Зеленоградск, ул. Большая окружная, 9 ежедневно с 8:00 до 20:00 (14:00-14:30)',
    },
    {
      latitude: 54.647416,
      longitude: 21.072114,
      name: 'г. Гвардейск, ул. Победы, 7 ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 54.571465,
      longitude: 20.173053,
      name: 'г. Ладушкин, пер. Почтовый, 10 ежедневно с 8:00 до 20:00',
    },
    {
      latitude: 20.2166667,
      longitude: 54.7,
      name: 'п. Волочаевское, ул. Центральная, 34 ежедневно с 8.00 до 20.00',
    },
  ];


  export default locations;