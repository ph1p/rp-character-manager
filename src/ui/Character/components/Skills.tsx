import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { addSignToNumber } from '../../../utils/helpers';
import { useCharacterStore } from '../../../store';
import { Input } from '../../../components/Input';
import { ContentBox } from '../../../components/ContentBox';
import { Checkbox } from '../../../components/Checkbox';

export const SkillsComponent = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();

  return (
    <ContentBox>
      <h3 className="text-2xl mb-3">{t('skills')}</h3>
      <div className="grid gap-2">
        {character.skills.values
          .slice()
          .sort((skill) => ~Number(skill.practiced) + 1)
          .map((skill) => {
            const name = `${t(`skill.${skill.name}`)} (${t(
              `attribute.${skill.attribute}`
            ).substr(0, 3)})`;
            return (
              <div key={skill.name} className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className={`mr-2 px-2 text-white bg-${
                      skill.practiced ? 'green' : 'gray'
                    }-500 rounded-full`}
                  >
                    {addSignToNumber(skill.score(character.id))}
                  </div>

                  {character.editMode ? (
                    <Input
                      label={name}
                      defaultValue={skill.bonusValue}
                      onChange={(e) =>
                        skill.setBonusValue(parseInt(e.currentTarget.value, 10))
                      }
                    />
                  ) : (
                    <>{name}</>
                  )}

                  {character.editMode && (
                    <Checkbox
                      className="ml-2 mt-4"
                      label={t('practiced')}
                      checked={skill.practiced}
                      onChange={() => skill.togglePracticed()}
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </ContentBox>
  );
});
