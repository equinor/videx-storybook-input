import { slider } from '../../src';
import { create, Selection } from 'd3';

export default { title: 'Slider' };

export const Standard = () => {

  const root: Selection<HTMLDivElement, undefined, null, undefined> = create('div');

  let square: Selection<HTMLDivElement, undefined, null, undefined>;

  slider(
    root,
    {
      header: 'Radius',
      min: 0,
      max: 50,
      step: 2,
      value: 10,
      dualInput: true,
    },
    d => {
      if(square) square.style('border-radius', `${d}px`)
    },
  );

  square = root.append('div')
  .style('margin', '10px')
  .style('width', '100px')
  .style('height', '100px')
  .style('border-radius', '10px')
  .style('background-color', 'SteelBlue')

  return root.node();
};
