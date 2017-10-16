import * as cheerio from 'cheerio';
import { importStyle } from '../utils';

const importStyles = template => {
    const domModule = cheerio.load(template)('body');
    domModule.remove('script');
    importStyle(domModule.html());
}

import './valo-icons.scss';

import * as color from 'vaadin-valo-theme/color.html';
import * as sizingAndSpacing from 'vaadin-valo-theme/sizing-and-spacing.html';
import * as style from 'vaadin-valo-theme/style.html';
import * as typography from 'vaadin-valo-theme/typography.html';
import * as fontIcons from 'vaadin-valo-theme/font-icons.html';

import * as _vaadinButton from 'vaadin-valo-theme/vaadin-button.html';
import * as _vaadinCheckbox from 'vaadin-valo-theme/vaadin-checkbox.html';
import * as _vaadinComboBox from 'vaadin-valo-theme/vaadin-combo-box.html';
import * as _vaadinContextMenu from 'vaadin-valo-theme/vaadin-context-menu.html';
import * as _vaadinDatePicker from 'vaadin-valo-theme/vaadin-date-picker.html';
import * as _vaadinDialog from 'vaadin-valo-theme/vaadin-dialog.html';
import * as _vaadinFormItem from 'vaadin-valo-theme/vaadin-form-item.html';
import * as _vaadinFormLayout from 'vaadin-valo-theme/vaadin-form-layout.html';
import * as _vaadinGrid from 'vaadin-valo-theme/vaadin-grid.html';
import * as _vaadinOverlay from 'vaadin-valo-theme/vaadin-overlay.html';
import * as _vaadinPasswordField from 'vaadin-valo-theme/vaadin-password-field.html';
import * as _vaadinTextField from 'vaadin-valo-theme/vaadin-text-field.html';

importStyles(color);
importStyles(sizingAndSpacing);
importStyles(style);
importStyles(typography);
importStyles(fontIcons);

importStyles(_vaadinButton);
importStyles(_vaadinCheckbox);
importStyles(_vaadinComboBox);
importStyles(_vaadinContextMenu);
importStyles(_vaadinDatePicker);
importStyles(_vaadinDialog);
importStyles(_vaadinFormItem);
importStyles(_vaadinFormLayout);
importStyles(_vaadinGrid);
importStyles(_vaadinOverlay);
importStyles(_vaadinPasswordField);
importStyles(_vaadinTextField);
