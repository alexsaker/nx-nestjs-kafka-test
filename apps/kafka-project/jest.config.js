module.exports = {
  name: 'kafka-project',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/kafka-project',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
