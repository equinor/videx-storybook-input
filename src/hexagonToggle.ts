import { Selection, easeBounce } from 'd3';

/**
 * Settings used to initialize hexagon toggle module.
 */
interface HexagonToggleSettings {
  /**
   * Header placed to the right of toggle module.
   */
  header: string,
  /**
   * Initial value of toggle.
   */
  value: boolean,
};

/**
 * Appends a hexagon toggle module to provided d3 node.
 * @param root d3 div element node to append toggle
 * @param settings Collection of settings to use when creating module
 * @param callback Callback function used when value changes
 */
export function hexagonToggle (root: Selection<HTMLDivElement, undefined, null, undefined>, settings: HexagonToggleSettings, callback: (d: boolean) => void): void {

  // get settings variables
  const header = settings.header || 'Toggle';
  let toggled = settings.value === undefined ? false : settings.value;

  let slider: Selection<SVGPolygonElement, undefined, null, undefined>;

  const svg: Selection<SVGSVGElement, undefined, null, undefined> = root.append('svg')
    .style('width', '50px')
    .style('height', '24px')

  // Container
  const container: Selection<SVGPolygonElement, undefined, null, undefined> = svg.append('polygon')
    .attr('points', '0,12 6.9,0 43.1,0 50,12 43.1,24 6.9,24')
    .attr('fill', toggled ? 'MediumSeaGreen' : 'Grey')
    .on('click', function() {
      toggled = !toggled;
      slider
        .transition()
        .ease(easeBounce)
        .duration(400)
        .attr('transform', toggled ? 'translate(36, 12)' : 'translate(14, 12)');
      container
        .transition()
        .duration(400)
        .attr('fill', toggled ? 'MediumSeaGreen' : 'Grey');
      if (callback && typeof callback === 'function') callback(toggled);
    });

  // Define hexagon
  slider = svg.append('polygon')
    .attr('points', '11.5,0 5.75,10 -5.75,10 -11.5,0 -5.75,-10 5.75,-10')
    .attr('fill', 'White')
    .attr('transform', toggled ? 'translate(36, 12)' : 'translate(14, 12)')
    .attr('pointer-events', 'none'); // Don't consume click events

  // Text
  root.append('div')
    .style('position', 'absolute')
    .style('transform', 'translate(60px, -26px)')
    .style('font-size', '16px')
    // Disable selection of text
    .style('-webkit-touch-callout', 'none')
    .style('-webkit-user-select', 'none')
    .style('-khtml-user-select', 'none')
    .style('-moz-user-select', 'none')
    .style('-ms-user-select', 'none')
    .style('user-select', 'none')
    // Set text
    .text(header)

  // Initial callback
  if (callback && typeof callback === 'function') callback(toggled);
}
