var event = require('./event');


var sampleEvent = {
    id: 1,
    title: 'JOY DIVISION',
    description: ['������� � ������� �� ������� ���������, �� ������� ����� � ����� ���������, � �������� �� �������, ��� ���� ��� ����������!',
    '��������� - ������� � ��������� ���������� ������ JOY DIVISION � �� ������� ��� ������� ��������� 16 ������� � 21:00 � ����� SENTRUM.'],
    image: 'https://image.karabas.com/w/350/h/496/f/files/import/502188467_ImageBig635871247089139902.jpg',
    location: '���',
    startDateTime: new Date(Date.UTC(2015,2,16,19,0)),
    priceHigh: 200,
    priceLow: 150,
    priceCurr: 'UAH',
    type: '���������-�������',
    eventUrl: 'https://kiev.karabas.com/ua/joy-division',
    orderUrl: 'https://kiev.karabas.com/ua/joy-division/order/'
}


var events = [];
events.push(sampleEvent);


module.exports = events;