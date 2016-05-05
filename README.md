# CAPE Editor

## Dev

```
git clone git@github.com:cape-io/cape-editor.git
cd cape-editor
npm install
npm start
```

## Entity structure
Fields that are user editable and might have variations are saved as entities. Each field value is given an id and has a structure like `{ type: 'name', value: 'Kai', id: 'abc' }`. This allows fields to have multiple values and for each value to have a specific ID. This also allows other entities to reference the specific field. An email address for example is referenced in many places. The reference is to a specific id. If a user wants to make different profile views they can pick specific fields. The profile view then references the specific field values the user wants displayed. The field is attached to the `subject` entity via a `triple`. See `redux-graph`.

## Editing
Currently the profile edit is a bit like editing a contact in the Contacts app. Fields have placeholder values but otherwise no label. See `src/components/FieldEditable`. There is also an option to have fields with labels. See `src/components/Wrapper`.
