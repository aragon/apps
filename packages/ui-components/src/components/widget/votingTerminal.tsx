import React, {useState} from 'react';
import {AlertInline} from '../alerts';
import {ButtonText} from '../button';
import {SearchInput} from '../input';
import {LinearProgress} from '../progress';
import {Radio, RadioGroup} from '../radioGroup';

export const VotingTerminal: React.FC = () => {
  const [buttonGroupState, setButtonGroupState] = useState('info');

  return (
    <div className="tablet:p-3 py-2.5 px-2 rounded-xl bg-ui-0">
      <div className="tablet:flex tablet:justify-between tablet:items-center mb-4 tablet:mb-5 ">
        <h1 className="text-2xl font-bold text-ui-800">Voting</h1>
        <RadioGroup
          defaultValue={buttonGroupState}
          onChange={setButtonGroupState}
        >
          <Radio value="breakdown">Breakdown</Radio>
          <Radio value="voters">Voters</Radio>
          <Radio value="info">Info</Radio>
        </RadioGroup>
      </div>
      {buttonGroupState === 'breakdown' ? (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex space-x-1.5">
              <p className="font-bold text-primary-500">Yes</p>
              <p className="flex-1 text-right text-ui-600">X Token</p>
              <p className="pl-6 font-bold text-primary-500">0%</p>
            </div>
            <LinearProgress max={100} value={1} />
          </div>
          <div className="space-y-1.5">
            <div className="flex space-x-1.5">
              <p className="font-bold text-primary-500">No</p>
              <p className="flex-1 text-right text-ui-600">X Token</p>
              <p className="pl-6 font-bold text-primary-500">0%</p>
            </div>
            <LinearProgress max={100} value={1} />
          </div>
        </div>
      ) : buttonGroupState === 'voters' ? (
        <div className="space-y-2">
          <SearchInput placeholder="Type Address, ENS or E-Mail" />
          <div>{'Table->Voters'}</div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-ui-600">
              <p>Options</p>
              <p className="font-bold text-ui-800">Yes + No</p>
            </div>
            <div className="flex justify-between text-ui-600">
              <p>Strategy</p>
              <p className="font-bold text-ui-800">1 Token -> 1 Vote</p>
            </div>
            <div className="flex justify-between text-ui-600">
              <p>Minimum Approval</p>
              <p className="font-bold text-ui-800">420k DNT (15%)</p>
            </div>
            <div className="flex justify-between text-ui-600">
              <p>Participation</p>
              <p className="font-bold text-ui-800">0 of 3.5M DNT (0%)</p>
            </div>
            <div className="flex justify-between text-ui-600">
              <p>Unique Voters</p>
              <p className="font-bold text-ui-800">0</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="font-bold text-ui-800">Duration</p>
            <div className="flex justify-between text-ui-600">
              <p>Options</p>
              <p className="font-bold text-ui-800">2021/11/17 00:00 AM UTC+2</p>
            </div>
            <div className="flex justify-between text-ui-600">
              <p>Options</p>
              <p className="font-bold text-ui-800">2021/16/17 00:00 AM UTC+2</p>
            </div>
          </div>
        </div>
      )}
      <div className="tablet:flex tablet:justify-between tablet:items-center mt-4 tablet:mt-5">
        <ButtonText label="Vote now" size="large" />
        <AlertInline label="Remaining time" mode="neutral" />
      </div>
    </div>
  );
};
