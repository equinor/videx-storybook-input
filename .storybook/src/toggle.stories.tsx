import { toggle } from '../../src';
import * as d3 from 'd3';

export default { title: 'Toggle' };

export const layer = () => {

  const root: d3.Selection<HTMLDivElement, undefined, null, undefined> = d3.create('div');

  let square: d3.Selection<HTMLDivElement, undefined, null, undefined>;

  toggle(
    root,
    {
      header: 'Visible',
      value: true,
    },
    d => {
      if(square) square.style('visibility', d ? null : 'hidden')
    },
  )

  square = root.append('div')
  .style('margin', '10px')
  .style('width', '100px')
  .style('height', '100px')
  .style('border-radius', '10px')
  .style('background-color', 'SteelBlue')

  return root.node();
};
