import React, {useState, useEffect} from 'react';
import {bindHook, utils, getLibraryMethod} from 'log';

const {log, COLOR: {SCHEDULE_COLOR, RENDER_COLOR, COMMIT_COLOR}} = utils;

// bindHook('beginWork', (current, wip) => {
//   log(RENDER_COLOR, `beginWork`, getLibraryMethod('getComponentNameFromFiber')?.(wip));
// })  

