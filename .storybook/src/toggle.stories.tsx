import { toggle, hexagonToggle } from '../../src';
import { create, Selection } from 'd3';

export default { title: 'Toggle' };

export const Standard = () => {

  const root: Selection<HTMLDivElement, undefined, null, undefined> = create('div');

  let square: Selection<HTMLDivElement, undefined, null, undefined>;

  toggle(
    root,
    {
      header: 'Visible',
      value: true,
    },
    d => {
      if(square) square.style('visibility', d ? null : 'hidden')
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

export const Hexagon = () => {

  const root: Selection<HTMLDivElement, undefined, null, undefined> = create('div');

  let square: Selection<HTMLDivElement, undefined, null, undefined>;

  hexagonToggle(
    root,
    {
      header: 'Visible',
      value: true,
    },
    d => {
      if(square) square.style('visibility', d ? null : 'hidden')
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
