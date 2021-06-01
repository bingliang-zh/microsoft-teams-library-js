import React, { ReactElement } from 'react';
import { location, SdkError } from '@microsoft/teamsjs-app-sdk';
import BoxAndButton from './BoxAndButton';
import { noHubSdkMsg } from '../App';

const LocationAPIs = (): ReactElement => {
  const [getLocationRes, setGetLocationRes] = React.useState('');
  const [showLocationRes, setShowLocationRes] = React.useState('');
  const [checkLocationCapabilityRes, setCheckLocationCapabilityRes] = React.useState('');

  const getLocation = (locationPropsInput: string): void => {
    const locationProps: location.LocationProps = JSON.parse(locationPropsInput);
    setGetLocationRes('location.getLocation()' + noHubSdkMsg);
    location.getLocation(locationProps, (err: SdkError, location: location.Location): void => {
      if (err) {
        setGetLocationRes(err.errorCode.toString + ' ' + err.message);
        return;
      }
      setGetLocationRes(JSON.stringify(location));
    });
  };

  const showLocation = (locationInput: string): void => {
    const locationParam: location.Location = JSON.parse(locationInput);
    setShowLocationRes('location.showLocation()' + noHubSdkMsg);
    location.showLocation(locationParam, (err: SdkError, result: boolean): void => {
      if (err) {
        setShowLocationRes(err.errorCode.toString + ' ' + err.message);
        return;
      }
      setShowLocationRes('result: ' + result);
    });
  };

  const locationCapabilityCheck = (): void => {
    if (location.isSupported()) {
      setCheckLocationCapabilityRes('Location module is supported');
    } else {
      setCheckLocationCapabilityRes('Location module is not supported');
    }
  };

  return (
    <>
      <BoxAndButton
        handleClickWithInput={getLocation}
        output={getLocationRes}
        hasInput={true}
        title="Get Location"
        name="getLocation"
      />
      <BoxAndButton
        handleClickWithInput={showLocation}
        output={showLocationRes}
        hasInput={true}
        title="Show Location"
        name="showLocation"
      />
      <BoxAndButton
        handleClick={locationCapabilityCheck}
        output={checkLocationCapabilityRes}
        hasInput={false}
        title="Check Location Capability"
        name="checkLocationCapability"
      />
    </>
  );
};

export default LocationAPIs;
