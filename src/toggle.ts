import * as d3 from 'd3';

/**
 * Settings used to initialize toggle module.
 */
interface ToggleSettings {
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
 * Appends a toggle module to provided d3 node.
 * @param root d3 div element node to append toggle
 * @param settings Collection of settings to use when creating module
 * @param callback Callback function used when value changes
 */
export function toggle (root: d3.Selection<HTMLDivElement, undefined, null, undefined>, settings: ToggleSettings, callback: (d: boolean) => void): void {
  // get settings variables
  const header: string = settings.header || 'Toggle';
  let toggled: boolean = (settings.value === undefined) ? false : settings.value;

  let slider: d3.Selection<HTMLDivElement, undefined, null, undefined>;

  // Container
  const container: d3.Selection<HTMLDivElement, undefined, null, undefined> = root.append('div')
    .style('width', '50px')
    .style('height', '24px')
    .style('background-color', toggled ? 'MediumSeaGreen' : 'Grey')
    .style('border-radius', '12px')
    .on("click", function() {
      toggled = !toggled;
      slider
        .transition()
        .ease(d3.easeBounce)
        .duration(400)
        .style('transform', toggled ? 'translate(28px, 2px)' : 'translate(2px, 2px)');
      container
        .transition()
        .duration(400)
        .style('background-color', toggled ? 'MediumSeaGreen' : 'Grey');
      if (typeof callback === 'function') callback(toggled);
    });

  // Slider
  slider = container.append('div')
    .style('position', 'absolute')
    .style('transform', toggled ? 'translate(28px, 2px)' : 'translate(2px, 2px)')
    .style('width', '20px')
    .style('height', '20px')
    .style('background-color', 'White')
    .style('border-radius', '10px')

  // Text
  container.append('div')
    .style('position', 'absolute')
    .style('transform', 'translate(60px, 3px)')
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
  if (typeof callback === 'function') callback(toggled);
}
