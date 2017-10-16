import * as cheerio from 'cheerio';
import { importStyle } from '../../utils';
import * as vaadinComboBoxStyles from 'vaadin-combo-box/vaadin-combo-box-styles.html';

const styles = cheerio.load(vaadinComboBoxStyles);
importStyle(`<style>${styles('head style').html()}</style>`);
importStyle(styles('body').html());
