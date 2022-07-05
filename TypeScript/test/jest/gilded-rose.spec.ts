import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

/* Generic Item */
// Quality of item is not negative

// Quality of item is less than 50

// Quality of item has decreased

// Quality of item after sell by date degraded twice as fast


/* Aged Brie */
// Quality of brie increased

/* Sulfuras */
// Quality of sulfuras is 80

/* Backstage passes */
// Quality of backstage pass before sell by date increased

// Quality of backstage pass 10 days or less before sell by date increased by 2

// Quality of backstage pass 5 days or less before sell by date increased by 3

// Quality of backstage pass drops to 0 after sell by date