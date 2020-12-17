import React from 'react';
import { shallow } from 'enzyme';
// import nock from 'nock';
import httpFetch from '../../../../../../src/client/js/react/utils/httpFetch';
import config from '../../../../../../src/client/js/react/config';
import { FuelDataForm } from 'components/dataEntryModule/forms/editFuelDataForm';
import { processSymfonyError } from 'utils/dataEntryModule';

const requiredProps = {
    refreshFlightListFunc: jest.fn(),
    closeFormFunc: jest.fn(),
    flightData: { id:'1' },
    show: true,
    t,
};

jest.mock('../../../../../../src/client/js/react/utils/httpFetch', () => {
    return {
        fetch: jest.fn().mockResolvedValue({ response:200 }),
    };
    
}); 

describe('<FuelDataForm /> ', () => {
    afterEach(() => jest.clearAllMocks());
    it('checks that the method updateFormState updates the form state', () => {     
        const wrapper = shallow(<FuelDataForm { ...requiredProps } />);
        const instance = wrapper.instance();
        wrapper.update();
       
        instance.updateFormState('ticketNumber', 999);
        instance.updateFormState('arrivalFuel', 123);
        instance.updateFormState('targetFuel', 454);
        instance.updateFormState('departureFuel', 123456);
        instance.updateFormState('totalizerStart', 100);
        instance.updateFormState('totalizerEnd', 25);

        expect(instance.state.ticketNumber).toBe(999);
        expect(instance.state.refuelType.value).toBe('refuel');
        expect(instance.state.arrivalFuel).toBe(123);
        expect(instance.state.targetFuel).toBe(454);
        expect(instance.state.departureFuel).toBe(123456);
        expect(instance.state.totalizerStart).toBe(100);
        expect(instance.state.totalizerEnd).toBe(25);
        expect(instance.state.upliftedVolume).toBe(-75);
    });

    it('checks resetAndCloseForm function resets the form state to default state', () => {
        const wrapper = shallow(<FuelDataForm { ...requiredProps } />);
        const instance = wrapper.instance();
        const closeFormFuncSpy = jest.spyOn(instance.props, 'closeFormFunc');

        instance.setState({
            arrivalFuel: 100,
            refuelType: {
                label: 'defuel',
                value: 'defuel',
            },
            targetFuel: 100,
            ticketNumber: '123',
            totalizerEnd: 25,
            totalizerStart: 50,
            upliftedVolume: 25,
            error: null,
        });

        instance.resetAndCloseForm();

        expect(instance.state).toEqual({
            arrivalFuel: 0,
            refuelType: {
                label: 'Refuel',
                value: 'refuel',
            },
            targetFuel: 0,
            ticketNumber: '',
            totalizerEnd: 0,
            totalizerStart: 0,
            upliftedVolume: 0,
            error: null,
        });  
      
        expect(closeFormFuncSpy).toHaveBeenCalledTimes(1);
        
    });
    it('should call the transformOptions method when changing the drop-down select list', () => {
        const wrapper = shallow(<FuelDataForm { ...requiredProps } />);
        const instance = wrapper.instance();
      
        const  options = [
            { labelKey: 'refuel', value: 'refuel' },
            { labelKey: 'defuel', value: 'defuel' },
            { labelKey: 'nsr', value: 'nsr' },
            { labelKey: 'maintenance', value: 'maintenance' },
            { labelKey: 'baseInput', value: 'baseInput' },
            { labelKey: 'baseRefuel', value: 'baseRefuel' },
        ];
        const  transformedOptions = [
            { label: 'Refuel', value: 'refuel' },
            { label: 'Defuel', value: 'defuel' },
            { label: 'NSR', value: 'nsr' },
            { label: 'Maintenance', value: 'maintenance' },
            { label: 'Base Input', value: 'baseInput' },
            { label: 'Base Refuel', value: 'baseRefuel' },
        ];
        
        expect(instance.transformOptions(options)).toEqual(transformedOptions);
    });
 
    it('calls postFormData on successful POST', (done) => {  
        const wrapper = shallow(<FuelDataForm { ...requiredProps } />);
        const instance = wrapper.instance();

        instance.updateFormState('ticketNumber', 999);
        instance.updateFormState('arrivalFuel', 123);
        instance.updateFormState('targetFuel', 454);
        instance.updateFormState('departureFuel', 123456);
        instance.updateFormState('totalizerStart', 100);
        instance.updateFormState('totalizerEnd', 25);

        const params = {
            flightId:'1',
            arrivalFuelOnBoard: 123,
            type:  'refuel',
            targetFuelOnBoard: 454,
            departureFuelOnBoard: 123456,
            ticketNumber: 999,
            totalizerEnd: 25,
            totalizerStart: 100,
            upliftedVolume: -75,
            
        };
        instance.postFormData().then(() => {
            expect(httpFetch.fetch).toHaveBeenCalledTimes(1);
            expect(httpFetch.fetch).toHaveBeenCalledWith(config.urls.dataEntryModule.order, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                params,
            }
            );
            expect(requiredProps.closeFormFunc).toHaveBeenCalledTimes(1);
            expect(requiredProps.refreshFlightListFunc).toHaveBeenCalledTimes(1);
            done();
        });
    });
});
          
describe('Tests for the processSymfonyError object', () => {
    it('returns when no arguments are passed indicating an error has occured', () => {
        expect(processSymfonyError()).toBeUndefined();
    });
        
    it('uncovered else branch', () => {
        const errorObjArg = { randomKey: {} };
        const errorObjArg2 = { details: {
            children: {
                randomKey: [],
            },
        } };
        const errorObjWithNull = { details: {
            children: {
                randomKey: {
                    errors: null,
                },
            },
        } };
        expect(processSymfonyError(errorObjArg)).toBeUndefined();
        expect(processSymfonyError(errorObjArg2)).toBeUndefined();
        expect(processSymfonyError(errorObjWithNull)).toBeUndefined();
    });

    it('smoke tests the errorObject arg', () => {
        const errorObjArg = {
            details: {
                children: {
                    testError1: {
                        errors: ['tests error 1 in the array'],
                    },
                },
            },
        };
        expect(processSymfonyError(errorObjArg)).toEqual('tests error 1 in the array');
    });
});
