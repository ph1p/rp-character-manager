import { useTranslation } from 'react-i18next';
import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { useCharacterStore } from '../../../store';
import { Input } from '../../../components/Input';

export const HitpointsComponent = observer(() => {
  const { t } = useTranslation();
  const store = useCharacterStore();

  const color = useMemo(() => {
    if (store.hitpointsPercentage < 33) {
      return '#b91c1c';
    } else if (store.hitpointsPercentage < 66) {
      return '#d97706';
    } else {
      return '#239669';
    }
  }, [store.hitpointsPercentage]);

  return (
    <div className="flex flex-col text-center place-items-center">
      <div>
        <svg className="h-48 w-48 md:h-32 md:w-32" viewBox="0 0 42 42">
          <circle
            className="donut-ring"
            cx="21"
            cy="21"
            r="15.91549430918954"
            fill="transparent"
            stroke="#d2d3d4"
            strokeWidth="6"
          />
          <text x="11" y="24" fontSize="0.5em" textLength="2.6em">
            {store.hitpoints}/{store.maxHitpoints}
          </text>

          <circle
            className="donut-segment"
            cx="21"
            cy="21"
            r="15.91549430918954"
            fill="transparent"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={`${store.hitpointsPercentage} ${
              100 - store.hitpointsPercentage
            }`}
            strokeDashoffset="25"
          />
        </svg>
      </div>
      <div>
        {store.editMode ? (
          <Input
            type="text"
            label={t('hitpoints')}
            defaultValue={store.maxHitpoints}
            onInput={(e) =>
              store.setMaxHitpoints(parseInt(e.currentTarget.value, 10))
            }
          />
        ) : (
          <div className="flex">
            <div
              className={`cursor-pointer font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200 h-9 w-9 text-lg md:text-xs md:h-6 md:w-6 text-center select-none`}
              onClick={() => store.setHitpoints(store.hitpoints - 1)}
            >
              -
            </div>
            <div className="mx-2 text-2xl md:text-base">{t('hitpoints')}</div>
            <div
              className={`cursor-pointer font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200 h-9 w-9 text-lg md:text-xs md:h-6 md:w-6  text-center select-none`}
              onClick={() => store.setHitpoints(store.hitpoints + 1)}
            >
              +
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
