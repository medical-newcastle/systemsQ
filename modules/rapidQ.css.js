
var _rules = `
#rapidQ-qsearch, #rapidQ-qfilter {
  display          : none;
}

/* Positioning */
#rapidQ-qbar {
  position         : absolute;
  left             :  50%;
  top              : 14px;
  height           : 34px;
  width            : 100%;
  transform        : translate( -50%, 0% );
}

#rapidQ-qbar input {
  height           :  32px;
  width            : calc(100% - 28px - 36px);
  margin           :   0px;
  padding          :   0px;
}

#rapidQ-qback {
  display          : inline-block;
  width            :  24px;
  margin-left      :   4px;
}

#rapidQ-qutil {
  position         : absolute;
  display          : inline-block;
  right            :   0px;
  top              :   50%;
  width            :  24px;
  transform        : translate( 0%, -50% );
}

#rapidQ-qsearch {
  position         : relative;
  height           : 700%;
  margin           : none;
  padding          : none;
  margin-block-start  :   0px;
  margin-block-end    :   0px;
  padding-inline-start:  34px;
}

#rapidQ-qsearch li {
  height           :  34px;
  width            : calc(100% - 32px);
}

#rapidQ-qsearch li div {
  height           : 100%;
  padding-left     :   6px;
  white-space      : nowrap;
}

#rapidQ-qfilter {
  position         : absolute;
  right            :   6px;
  top              : calc(34px + 7px + 11px);
  width            :   53.5%;
  margin-block-start  : 0;
  margin-block-end    : 0;
  padding-inline-start: 4px;
}

#rapidQ-qfilter li {
  height           :  24px;
}

#rapidQ-qfilter li .rapidQ-selector {
  position         : absolute;
  display          : inline-block;
  left             : 4px;
  width            : calc(100% - 31px);
}

#rapidQ-qsize {
  position         : absolute;
  right            : 45px;
  top              : 50%;
  transform        : translate( 0%, -55% );
}

#rapidQ-minimum {
  position         : absolute;
  bottom           :   0px;
  top              :   0px;
  min-height       :  48px;
  left             :  50%;
  width            : 315px;
  transform        : translate( -50%, 0% );
}

#rapidQ-query, #rapidQ-answer {
  position         : absolute;
  top              : calc(34px + 16px);
  width            : 100%;
  height           : calc(100% - 34px - 14px);
}

#rapidQ-query-content {
  position         : relative;
  top              : 155px;
}

#rapidQ-answer-content {
  padding-left     :  4px;
  margin           : auto 0;
}

#rapidQ-answer {
  display          : flex;
  flex-direction   : column;
  justify-content  : center;
}

br {
  display          : block;
  content          : '';
  margin-top       : 7;
}

#rapidQ-footer {
  position         : absolute;
  bottom           : 0px;
  left             : 50%;
  width            : calc(100% - 44px);
  height           : 100%;
  transform        : translate( calc(-50% + 21px), 0% );
}

#rapidQ-footer-extension {
  position         : absolute;
  bottom           : 0px;
  left             : 0px;
  width            : 100%;
  height           : 37px;
}

#rapidQ-contribute {
  position         : absolute;
  bottom           : 3px;
  left             : 50%;
  transform        : translate( -50%, 0% );
}

#rapidQ-copy {
  position         : absolute;
  top              : 0px;
  right            : 7px;
  width            : 28px;
  height           : 100%;
}

#rapidQ-copy-icon {
  position         : absolute;
  left             : 50%;
  top              : 50%;
  transform        : translate( -45%, -50% );
}

#rapidQ-clear {
  position         : absolute;
  top              : 0px;
  right            : calc(7px + 28px + 0px);
  width            : 28px;
  height           : 100%;
}

#rapidQ-feeder {
  position         : absolute;
  top              : 0px;
  left             : 7px;
  height           : 100%;
}

.rapidQ-feeder-icon {
  width            : 15px;
  height           : 15px;
}

#rapidQ-answer-src {
  position         : absolute;
  top              : 0%;
  left             : 34px;
  width            : 28px;
  height           : 28px;
}

#rapidQ-answer-source {
  display          : none;
  position         : absolute;
  top              : calc(-100% - 9px);
  left             : 0px;
  width            : calc(315px - 7px - 7px - 0.8em - 0.5em);
  height           : 43px;
  padding          : 0.4em;
}

#rapidQ-copied {
  position         : absolute;
  top              : -21px;
  right            : calc(4px);
}

#rapidQ-error {
  position         : absolute;
  left             : 50%;
  top              : 50%;
  transform        : translate( -50%, -50% );
  z-index          : 55;
}

#rapidQ-download-notice {
  position         : absolute;
  top              : 0px;
  left             : 50%;
  transform        : translate( -50%, 0% );
}

#rapidQ-addQuestion {
  width            : 28px;
  height           : 28px;
}

/* Design */
#rapidQ-qutil, #rapidQ-qsearch li, #rapidQ-query-content, #rapidQ-answer-content, #rapidQ-answer, #rapidQ-qfilter li, #rapidQ-qfilter li .rapidQ-selector, .rapidQ-feeder-icon, #rapidQ-copy, #rapidQ-clear {
  cursor           : pointer;
}

#rapidQ-qback, #rapidQ-qutil, #rapidQ-qsize, #rapidQ-query, #rapidQ-answer, #rapidQ-answer-src, #rapidQ-addQuestion, #rapidQ-contribute, #rapidQ-copy-icon {
  user-select      : none;
}

#rapidQ-qbar input {
  border           :  none;
  border-radius    :   3px;
}

#rapidQ-qback {
  cursor           : default;
}

#rapidQ-qback.useable {
  cursor           : pointer;
}

#rapidQ-qsearch {
  list-style       : none;
  overflow-y       : auto;
}

#rapidQ-qsearch li div {
  overflow-x       : hidden;
}

#rapidQ-qfilter {
  list-style       : none;
}

#rapidQ-qfilter li .rapidQ-selector {
  text-align       : left;
}

input:focus {
  outline          : rgba( 145,  23,  23, 1.00 );
}

#rapidQ-answer-src {
  border-bottom-left-radius  : 23%;
  border-bottom-right-radius : 23%;
}

#rapidQ-answer-source {
  transition       : all 140ms;
  border-radius    : 5px;
  border-bottom-left-radius : 0px;
  border-bottom-right-radius: 0px;
  border-bottom    : 0px;
  overflow-y       : scroll;
}

#rapidQ-answer-source::-webkit-scrollbar { 
  display: none; 
}

#rapidQ-addQuestion {
  border-bottom-left-radius  : 23%;
  border-bottom-right-radius : 23%;
}

#rapidQ-footer, #rapidQ-footer-extension {
  border-top-left-radius    : 5px;
  border-top-right-radius   : 5px;
}

#rapidQ-copy {

}

#rapidQ-hidden-input {
  position: absolute;
  left: -999em;
}

#rapidQ-copied {
  opacity   : 0;
}

#rapidQ-clear {
  text-align : center;
}

/* Colours */
#rapidQ-qbar input {
  background-color : rgba(   1,   1,   1, 0.00 );
  border-bottom    : 1px solid rgba( 145, 145,  45, 1 );
  border-bottom    : 1px solid rgba(  55,  55,  55, 1.00 );
}

#rapidQ-qsearch li {
  /* background       : rgba( 145, 145, 188, 0.67 ); */
  background-color : rgba(  10, 140, 240, 0.80 );
}

#rapidQ-qsearch li div:hover {
  /* background       : rgba(  10, 100, 255, 0.88 ); */
  background-color : rgba(  10, 140, 240, 1.00 );
}

#rapidQ-qfilter {
  background-color : rgba(  10, 140, 240, 1.00 );
  background-image : url('./assets/rastery.png');
}

#rapidQ-qfilter li:hover {
  background-color : rgba(  15, 145, 255, 0.5 );
}

#rapidQ-answer-src {
  background-color : rgba(   1,   1,   1, 0.02 );
}

#rapidQ-answer-source {
  background-color : rgba( 201, 201, 201, 0.11 );
}

#rapidQ-answer-src:hover {
  background-color : rgba(  55,  55,  55, 0.08 );
}

#rapidQ-answer-src.shown:hover {
  background-color : rgba(  55,  55,  55, 0.23 );
}

#rapidQ-footer {
  background-color : rgba( 255, 255, 255, 0.03 );
}

#rapidQ-footer-extension {
  background-color : rgba( 255, 255, 255, 0.09 );
}

#rapidQ-copy:hover, #rapidQ-clear:hover {
  background-color : rgba( 255, 255, 255, 0.03 );
}

#rapidQ-copy-icon {
  filter: invert(15%) brightness(88%);
}

#rapidQ-copy:hover #rapidQ-copy-icon {
  filter: brightness(3%);
}

#rapidQ-addQuestion {
  background-color : rgba(   1,   1,   1, 0.02 );
}

#rapidQ-addQuestion:hover {
  background-color : rgba(  55,  55,  55, 0.08 );
}

/* Fonts */
#rapidQ-qbar input, #rapidQ-qback, #rapidQ-qutil, #rapidQ-qsearch li div, #rapidQ-qfilter li, .rapidQ-feeder-icon, #rapidQ-error {
  font-family      : 'Quicksand';
}

#rapidQ-qbar input {
  font-size        :  14pt;
  color            : rgba(  55,  55,  55, 1.00 );
}

#rapidQ-qbar input::placeholder {
  color            : rgba(  55,  55,  55, 1.00 );
}

#rapidQ-qback {
  font-size        :  24pt;
  line-height      :  28px;
  color            : rgba( 125, 125, 125, 0.72 );
  color            : rgba(  55,  55,  55, 1.00 );
}

#rapidQ-qback.useable {
  color            : rgba( 144, 144, 144, 1.00 );
}

#rapidQ-qutil {
  font-size        :  15pt;
  line-height      :  28px;
  color            : rgba( 125, 125, 125, 1.00 );
  color            : rgba(  55,  55,  55, 1.00 );
}

#rapidQ-qutil:hover {
  color            : rgba( 191, 191, 191, 1.00 );
}

#rapidQ-qsearch li div {
  font-size        :  11pt;
  line-height      : calc(34px - 5px);
}

#rapidQ-qfilter {
  text-align       : right;
}

#rapidQ-qfilter li {
  font-size        :  11pt;
  line-height      :  25px;
}

#rapidQ-qfilter li:hover {
  color            : rgba( 255, 255, 255, 0.78 );
}

#rapidQ-qsize {
  font-family      : 'Oswald','Open Sans Condensed';
  font-size        :  14pt;
  color            : rgba( 144, 144, 144, 1.00 );
  color            : rgba(  25,  25,  25, 0.36 );
}

#rapidQ-query-content, #rapidQ-answer-content {
  font-family      : 'Open Sans Condensed';
  color            : rgba(  23,  23,  23, 1.00 );
}

#rapidQ-query-content {
  text-align       : center;
  font-size        :  18pt;
}

#rapidQ-answer-content {
  text-align       : left;
  font-size        :  16pt;
}

#rapidQ-footer {
  font-family      : 'Oswald','Open Sans Condensed';
  font-size        :  10pt;
  color            : rgba(  41,  41,  41, 0.55 );
}

.rapidQ-feeder-icon {
  text-align       : center;
  line-height      : 15px;
  font-size        : 12pt;
  color            : rgba(  41,  41,  41, 0.85 );
}

.rapidQ-feeder-icon:hover {
  color            : rgba( 144, 144, 144, 0.85 );
}

#rapidQ-answer-src {
  line-height      : 26px;
}

#rapidQ-answer-source {
  font-family      : 'Oswald','Open Sans Condensed';
  font-size        : 10pt;
  color            : rgba(  41,  41,  41, 0.55 );
}

#rapidQ-copy:hover #rapidQ-copy-icon {
  color            : rgba( 144, 144, 144, 0.85 );
}

#rapidQ-copied {
  color            : rgba(   1,   1,   1, 0.89 );
}

#rapidQ-clear {
  font-size        : 12pt;
  line-height      : calc(44px);
}

#rapidQ-clear:hover {
  color            : rgba(   1,   1,   1, 0.85 );
}

#rapidQ-download-notice {
  font-family      : 'Oswald';
  font-size        : 8pt;
  color            : rgba(   1,   1,   1, 0.67) ;
}

#rapidQ-addQuestion {
  line-height      : 26px;
}

/* The switch - the box around the slider */
.rapidQ-switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
  top   : -12px;
}

/* Hide default HTML checkbox */
.rapidQ-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.rapidQ-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .23s;
  transition: .23s;
}

.rapidQ-slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .23s;
  transition: .23s;
}

input:checked + .rapidQ-slider {
  background-color: #2196F3;
}

input:focus + .rapidQ-slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .rapidQ-slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

/* Rounded sliders */
.rapidQ-slider.rapidQ-round {
  border-radius: 17px;
}

.rapidQ-slider.rapidQ-round:before {
  border-radius: 50%;
}

#rapidQ-qdisplayingLists {
  position  : absolute;
  top       : calc(34px + 14px);
  width     : 315px;
  height    : calc(100% - 34px - 14px - 37px);
  left      : 0%;
  overflow-y: auto;
  list-style: none;
  background-color : rgba(  10, 140, 240, 1);
  background-image : url('../raster.png');
}
#rapidQ-qdisplayingLists li {
  cursor       : pointer;
  font-family  : 'Oswald';
  font-size    : 11pt;
  background   : rgba( 255, 255, 255, 0.03 );
  border-bottom: 1px solid rgba( 255, 255, 255, 0.05 );
  border-top   : 1px solid rgba( 255, 255, 255, 0.05 );
  margin-bottom: 0.2em;
}

#rapidQ-qdisplayingLists li:hover {
  color        : rgba( 215, 215, 215, 1 ); 
}

@keyframes rapidQfadeout {
    0% {opacity:1;}
    100% {opacity:0;}
}
.rapidQ-fadeOut {
  opacity:0;
  -moz-animation   : rapidQfadeout 510ms linear;
  -webkit-animation: rapidQfadeout 510ms linear;
  animation        : rapidQfadeout 510ms linear;
  -webkit-animation-fill-mode: forwards;
}
.rapidQ-fadeOutSine {
  opacity:0;
  -moz-animation   : rapidQfadeout 810ms ease-in-out;
  -webkit-animation: rapidQfadeout 810ms ease-in-out;
  animation        : rapidQfadeout 810ms ease-in-out;
  -webkit-animation-fill-mode: forwards;
}

/* Add Questions */
#rapidQ-addQ {
  position         : absolute;
  top              : 24px;
  left             : 0.2em;
  width            : calc(100% - 0.4em);
  height           : calc(100% - 24px - 13px);
  
  border-radius    : 7px;
}
#rapidQ-addQ div {
  position         : absolute;
  font-family      : 'Quicksand';
  font-size        : 12pt;
  color            : rgba( 25, 25, 25, 1.0 );
}
#rapidQ-addQ-background {
  width            : 100%;
  height           : 100%;
  background-color : rgba(255,255,255,0.02);
  backdrop-filter  : blur(7px);
}
#rapidQ-addQ-content {
  width            : 100%;
  height           : 100%;
}

#rapidQ-addQ-closer {
  top              : 0%;
  right            : 0%;
  width            : 28px;
  height           : 28px;
  
  border-top-right-radius: 7px;
  
  text-align       : center;
  line-height      : 27px;
  font-family      : 'Quicksand';
  font-size        : 14pt;
  
  cursor           : pointer;
  
  color            : rgba( 114,  15,  15, 1.00 );
  background-color : rgba( 255, 255, 255, 0.08 );
}
#rapidQ-addQ-closer:hover {
  color            : rgba( 212,  35,  35, 1.00 );
}

#rapidQ-addQ-question {
  top              : 28px;
  left             : 13px;
  width            : calc(100% - 13px - 13px);
}
#rapidQ-addQ-question-label {
  height           : 28px;
}
#rapidQ-addQ-question textarea {
  position         : absolute;
  top              : calc( 28px );
  height           : calc( 2 * 28px );
  width            : calc(100%);
}
#rapidQ-addQ-answers {
  top              : calc(28px + 3 * 28px + 14px);
  left             : 13px;
  width            : calc(100% - 13px - 13px);
}
#rapidQ-addQ-answers-label {
  height           : 28px;
}
#rapidQ-addQ-answers textarea {
  position         : absolute;
  top              : calc( 28px );
  height           : calc( 5 * 28px );
  width            : calc(100%);
}
#rapidQ-addQ-tags {
  top              : calc(28px + 3 * 28px + 14px + 6 * 28px + 14px);
  left             : 13px;
  width            : calc(100% - 13px - 13px);
}
#rapidQ-addQ-tags-label {
  height           : 28px;
}
#rapidQ-addQ-tags textarea {
  position         : absolute;
  top              : calc( 28px );
  height           : calc( 2 * 28px );
  width            : calc(100%);
}
#rapidQ-addQ-source {
  top              : calc(28px + 3 * 28px + 14px + 6 * 28px + 14px + 3 * 28px + 14px);
  left             : 13px;
  width            : calc(100% - 13px - 13px);
}
#rapidQ-addQ-source-label {
  height           : 28px;
}
#rapidQ-addQ-source textarea {
  position         : absolute;
  top              : calc( 28px );
  height           : calc( 2 * 28px );
  width            : calc(100%);
}

#rapidQ-addQ-save {
  cursor           : pointer;
  left             : 50%;
  top              : calc(28px + 3 * 28px + 14px + 6 * 28px + 14px + 3 * 28px + 14px + 3 * 28px + 14px);
  height           : 48px;
  transform        : translate( -50%, 0% );
  width            : 64%;
  text-align       : center;
  line-height      : 48px;
  background-color : rgba(  55,  55,  55, 0.03 );
  border-radius    : 4px;
}
#rapidQ-addQ-save:hover {
  background-color : rgba( 205, 205, 205, 0.08 );
  color            : rgba( 205, 205, 205, 1.00 );
}

#rapidQ-addQ-content textarea {
  font-family      : 'Quicksand';
  font-size        : 10pt;
  color            : rgba(  25,  25,  25, 1.00 );
  background-color : rgba( 255, 255, 255, 0.11 );
  
  border-radius: 4px;
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/
}
#rapidQ-addQ-question-label, #rapidQ-addQ-answers-label, #rapidQ-addQ-tags-label, #rapidQ-addQ-source-label {
  user-select: none;
}


`

css.add(_rules, 'body', 'css-rapidQ')