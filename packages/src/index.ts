// #!/usr/bin/env node
// import {
//   Options,
//   Plugin,
//   Generator,
//   GeneratorMap,
//   selectGenerator,
// } from '@code-shaper/shaper-utils';
// import { archgenerator as generator } from './generator/index';

// const generators: GeneratorMap = {};

// function registerGenerator(generator: Generator) {
//   const { id } = generator;
//   generators[id] = generator;
// }

// // ----- Register Generators Here -----
// registerGenerator(generator);
// const reactArchetypePlugin: Plugin = {
//   id: '@genesisx/react-archetype',
//   name: 'ReactArchetype',
//   description: 'generates React Archetype artifacts',
//   run: async (inputOptions: Options) => {
//     const generator = await selectGenerator(generators, inputOptions);
//     if (!generator) {
//       return Promise.resolve();
//     }

//     return generator.generate(process.cwd(), inputOptions);
//   },
// }

// export default reactArchetypePlugin;
