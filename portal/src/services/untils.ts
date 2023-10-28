import { isInteger } from 'lodash';
import moment from 'moment';
import { API } from './typings';

export const showDownloadFile = (fileName: string, data: any, contentType: string = '') => {
    const blob = new Blob([data], { type: contentType });
    // console.log(blob);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

export const enumToStatus = (value: any) => {
    const result = Object.keys(value)
        .filter((x) => isInteger(x))
        .map((x) => {
            return {
                [x]: {
                    text: value[x],
                },
            };
        });
    return result;
};

export const enumToOptions = (value: any, valueAsInteger: boolean = true) => {
    const result = Object.keys(value)
        .filter((x) => parseInt(x) >= 0)
        .map((x) => {
            return {
                label: value[x],
                value: valueAsInteger ? parseInt(x) : x,
            };
        });
    return result;
};

export const listToOptions = (source: any[], valueName: string, labelName: string) => {
    const result = source.map((x) => {
        return {
            label: x[labelName],
            value: x[valueName],
        };
    });
    return result;
};

export const formatDateTimeToUtc = (value: string) => {
    if (value) {
        if (moment(value).isValid()) {
            return moment(value).utc();
        }
    }
    return value;
};

export const formatUserName = (value: API.IdentityUser) => {
    if (value.name && value.surname) return value.name + ' ' + value.surname;
    else if (value.name) return value.name;
    else if (value.surname) return value.surname;
    else return '';
};
