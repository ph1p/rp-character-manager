import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { useCharacterStore } from '../../../store';
import { Input } from '../../../components/Input';
import { ContentBox } from '../../../components/ContentBox';
import { Checkbox } from '../../../components/Checkbox';

export const SkillsComponent = observer(() => {
  const { t } = useTranslation();
  const store = useCharacterStore();

  return (
    <ContentBox>
      <h3 className="text-2xl mb-3">Skills</h3>
      <div className="grid gap-2">
        {store.skills.values
          .slice()
          .sort((skill) => ~Number(skill.practiced) + 1)
          .map((skill) => {
            const name = `${t(`skill.${skill.name}`)} (${t(`attribute.${skill.attribute}`).substr(0, 3)})`
            return (
              <div key={skill.name} className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className={`mr-2 px-2 text-white bg-${
                      skill.practiced ? 'green' : 'gray'
                    }-500 rounded-full`}
                  >
                    {skill.score}
                  </div>
                  <div>
                    {store.editMode ? (
                      <Input
                        label={name}
                        defaultValue={skill.bonusValue}
                        onChange={(e) =>
                          skill.setBonusValue(
                            parseInt(e.currentTarget.value, 10)
                          )
                        }
                      />
                    ) : (
                      <>
                        {name}
                      </>
                    )}
                  </div>
                  {store.editMode && (
                    <Checkbox
                      className="ml-auto"
                      label="ist geübt"
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
