const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    editMode: {
      type: 'boolean',
    },
    name: {
      type: 'string',
    },
    level: {
      type: 'number',
    },
    maxHitpoints: {
      type: 'number',
      minimum: 0,
    },
    hitpoints: {
      type: 'number',
      minimum: 0,
    },
    armorClass: {
      type: 'number',
    },
    initiative: {
      type: 'number',
    },
    movement: {
      type: 'number',
    },
    proficiencyBonus: {
      type: 'number',
    },
    inventory: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              quantity: { type: 'number' },
              id: { type: 'string' },
              isAttack: { type: 'boolean' },
            },
          },
        },
      }
    },
    attributes: {
      type: 'object',
      properties: {
        values: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              score: { type: 'number' },
              name: { type: 'string' },
              extraScore: { type: 'number' },
              isSavingThrow: { type: 'boolean' },
            },
          },
        },
      }
    },
    skills: {
      type: 'object',
      properties: {
        values: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              attribute: { type: 'string' },
              name: { type: 'string' },
              practiced: { type: 'boolean' },
              bonusValue: { type: 'number' },
            },
          },
        },
      }
    },
    notes: {
      type: 'object',
      properties: {
        values: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              text: { type: 'string' },
              date: { type: 'number' },
            },
          },
        },
      },
    },
  },
  required: [
    'id',
    'editMode',
    'name',
    'level',
    'maxHitpoints',
    'hitpoints',
    'armorClass',
    'initiative',
    'movement',
    'proficiencyBonus',
    'inventory',
    'notes',
    'skills',
    'attributes',
  ],
  additionalProperties: true,
};

export default schema;