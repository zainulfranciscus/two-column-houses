import {Selector} from 'testcafe';


fixture `Adding houses into the right column`
    .page `http://localhost:3000/`;

test('Clicking on an add button, adds a house to the right column', async t => {

    const house = Selector('#container-1');
    const addBtn = '#move-btn-1';
    const houseInRightColumn = Selector('#right-column #container-1');
    await t
        .hover(house)
        .click(addBtn)
        .expect(houseInRightColumn.count).eql(1);
});

test('Clicking on a remove button, removes a house in the right column', async t => {

    const house = Selector('#container-4');
    const removeBtn = '#move-btn-4';
    const houseInRightColumn = Selector('#right-column #container-4');
    await t
        .hover(house)
        .click(removeBtn)
        .expect(houseInRightColumn.count).eql(0);
});