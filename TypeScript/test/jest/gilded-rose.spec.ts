import { Item, GildedRose } from '@/gilded-rose';

/* Generic Item */
describe('Generic item', () => {
  it('should not have negative quality', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(0);
  });
  
  it('should have quality less than 50', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(50);
  });
  
  it('should degrade if not pass sell by date', () => {
    const initiailQuality = 10;
    const gildedRose = new GildedRose([new Item('foo', 1, initiailQuality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThan(initiailQuality);
  });
  
  it('should degrade twice as fast if pass sell by date', () => {
    const initialQuality = 10;
    const gildedRose = new GildedRose([new Item('foo', 1, initialQuality)]);
    const gildedRoseExpired = new GildedRose([new Item('foo', 0, initialQuality)]);
    
    const items = gildedRose.updateQuality();
    const itemsExpired = gildedRoseExpired.updateQuality();
    
    const normalDegration = initialQuality - items[0].quality;
    
    expect(itemsExpired[0].quality).toBe(initialQuality - (2 * normalDegration));
  });
  
  it('should have decreased sell in', () => {
    const initialSellIn = 10;
    const gildedRose = new GildedRose([new Item('foo', initialSellIn, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBeLessThan(initialSellIn);
  });
  
});


/* Aged Brie */
describe('Aged Brie', () => {
  it('should increase in quality', () => {
    const initialQuality = 5
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, initialQuality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThan(initialQuality);
  });
  
  it('should have quality less than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(50);
  });
  
  it('should have decreased sell in', () => {
    const initialSellIn = 10;
    const gildedRose = new GildedRose([new Item('Aged Brie', initialSellIn, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBeLessThan(initialSellIn);
  });
})

/* Sulfuras */
describe('Sulfuras, Hand of Ragnaros', () => {
  it('should have quality of 80 and not change', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  it('should have no change in sell in', () => {
    const initialSellIn = 10;
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', initialSellIn, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(initialSellIn);
  });

})

/* Backstage passes */
describe('Backstage passes to a TAFKAL80ETC concert', () => {
  it('should have quality less than 50', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(50);
  });

  it('should increase in quality if before sell by date', () => {
    const initialQuality = 5;
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 1, initialQuality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThan(initialQuality);
  });
  
  it('should increase in quality by 2 if 10 days or less before sell by date', () => {
    const initialQuality = 5;
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, initialQuality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(initialQuality + 2);
  });
  
  it('should increase in quality by 3 if 5 days or less before sell by date', () => {
    const initialQuality = 5;
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, initialQuality)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(initialQuality + 3);
  });
  
  it('should have quality 0 after concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should have decreased sell in', () => {
    const initialSellIn = 10;
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', initialSellIn, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBeLessThan(initialSellIn);
  });
})