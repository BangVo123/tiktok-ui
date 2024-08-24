export const initState = {
    isReplace: false,
    process: 1,
    desc: '',
    numsDesc: 0,
    see: 'Followers',
    time: 'Now',
    copyrightCheck: 'false',
    seeFull: false,
    userAllow: ['Comment'],
    postContent: false,
    generateContent: false,
};

export const ON_REPLACE = 'onReplay';
export const ON_CHANGE = 'onChange';
export const ADD_SPECIAL = 'addSpecial';
export const CHANGE_SEE_OPTION = 'changeSeeOption';
export const CHANGE_TIME_UPLOAD = 'changeTimeUpload';
export const TOGGLE_COPYRIGHT = 'toggleCopyright';
export const SET_SEE_FULL = 'setSeeFull';
export const SET_PERMISSION = 'setPermission';
export const TOGGLE_POST_CONTENT = 'togglePostContent';
export const TOGGLE_GENERATE_CONTENT = 'toggleGenerateContent';

const reducer = (state, action) => {
    switch (action.type) {
        case ON_REPLACE:
            return {
                ...state,
                isReplace: !state.isReplace,
            };
        case ON_CHANGE:
            return {
                ...state,
                desc: action.value,
                numsDesc: action.value.length,
            };
        case ADD_SPECIAL:
            return {
                ...state,
                desc: state.desc + action.value,
                numsDesc: ++state.numsDesc,
            };
        case CHANGE_SEE_OPTION:
            return {
                ...state,
                see: action.value,
            };
        case CHANGE_TIME_UPLOAD:
            return {
                ...state,
                time: action.value,
            };
        case TOGGLE_COPYRIGHT:
            return {
                ...state,
                copyrightCheck: action.value,
            };
        case SET_SEE_FULL:
            return {
                ...state,
                seeFull: action.value,
            };
        case SET_PERMISSION:
            if (state.userAllow.includes(action.value)) {
                return {
                    ...state,
                    userAllow: state.userAllow.filter(
                        (el) => el !== action.value,
                    ),
                };
            } else {
                return {
                    ...state,
                    userAllow: [...state.userAllow, action.value],
                };
            }
        case TOGGLE_POST_CONTENT:
            return {
                ...state,
                postContent: action.value,
            };
        case TOGGLE_GENERATE_CONTENT:
            return {
                ...state,
                generateContent: action.value,
            };
        default:
            console.log('Action does not define');
            break;
    }
};

export default reducer;
