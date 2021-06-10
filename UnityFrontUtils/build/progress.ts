import a from "../lib/formData";

interface progressClass{
    fmt:fmtType;
}
type fmtType = ":current" | ":total" | ":elapsed" | ":eta" | ":percent" | ":rate" | ":bar" | string;
type progressClassOptions = {
    // [key:string]:any;
    stream:any;
    total:number;
    curr:number;
}
type charsType = {
    complete:string;
    incomplete:string;
    head:string;
}
declare const Math:any;
declare const Date:any;
export default class progress implements progressClass{
    fmt:fmtType;
    curr:any;
    total:any;
    width:number;
    renderThrottle:number;
    lastRender:number;
    tokens:any;
    lastDraw:any;
    start:any;
    callback:(arg:progressClass)=>void;
    clear:boolean;
    complete:boolean;
    chars:charsType;
    stream:any;
    constructor(fmt:fmtType, options:progressClassOptions | any) {
        this.stream = options.stream || process.stderr;

        if (typeof(options) == 'number') {
            var total = options;
            options = {};
            options.total = total;
        } else {
            options = options || {};
            if ('string' != typeof fmt) throw new Error('format required');
            if ('number' != typeof options.total) throw new Error('total required');
        }

        this.fmt = fmt;
        this.curr = options.curr || 0;
        this.total = options.total;
        this.width = options.width || this.total;
        this.clear = options.clear
        this.chars = {
            complete   : options.complete || '=',
            incomplete : options.incomplete || '-',
            head       : options.head || (options.complete || '=')
        };
        this.renderThrottle = options.renderThrottle !== 0 ? (options.renderThrottle || 16) : 0;
        this.lastRender = -Infinity;
        this.callback = options.callback || function () {};
        this.tokens = {};
        this.lastDraw = '';
    }

    tick(len?:any, tokens?:any){
        if (len !== 0)
            len = len || 1;

        // swap tokens
        if ('object' == typeof len) tokens = len, len = 1;
        if (tokens) this.tokens = tokens;

        // start time for eta
        if (0 == this.curr) this.start = new Date;

        this.curr += len

        // try to render
        this.render();

        // progress complete
        if (this.curr >= this.total) {
            this.render(undefined, true);
            this.complete = true;
            this.terminate();
            this.callback(this);
            return;
        }
    }

    render(tokens?:any, force?:any) {
        force = force !== undefined ? force : false;
        if (tokens) this.tokens = tokens;

        if (!this.stream.isTTY) return;

        var now = Date.now();
        var delta = now - this.lastRender;
        if (!force && (delta < this.renderThrottle)) {
            return;
        } else {
            this.lastRender = now;
        }

        var ratio = this.curr / this.total;
        ratio = Math.min(Math.max(ratio, 0), 1);

        var percent = Math.floor(ratio * 100);
        var incomplete, complete, completeLength;
        var elapsed = new Date - this.start;
        var eta = (percent == 100) ? 0 : elapsed * (this.total / this.curr - 1);
        var rate = this.curr / (elapsed / 1000);

        /* populate the bar template with percentages and timestamps */
        var str = this.fmt
            .replace(':current', this.curr)
            .replace(':total', this.total)
            .replace(':elapsed', isNaN(elapsed) ? '0.0' : (elapsed / 1000).toFixed(1))
            .replace(':eta', (isNaN(eta) || !isFinite(eta)) ? '0.0' : (eta / 1000)
                .toFixed(1))
            .replace(':percent', percent.toFixed(0) + '%')
            .replace(':rate', Math.round(rate));

        /* compute the available space (non-zero) for the bar */
        var availableSpace = Math.max(0, this.stream.columns - str.replace(':bar', '').length);
        if(availableSpace && process.platform === 'win32'){
            availableSpace = availableSpace - 1;
        }

        var width = Math.min(this.width, availableSpace);

        /* TODO: the following assumes the user has one ':bar' token */
        completeLength = Math.round(width * ratio);
        complete = Array(Math.max(0, completeLength + 1)).join(this.chars.complete);
        incomplete = Array(Math.max(0, width - completeLength + 1)).join(this.chars.incomplete);

        /* add head to the complete string */
        if(completeLength > 0)
            complete = complete.slice(0, -1) + this.chars.head;

        /* fill in the actual progress bar */
        str = str.replace(':bar', complete + incomplete);

        /* replace the extra tokens */
        if (this.tokens) for (var key in this.tokens) str = str.replace(':' + key, this.tokens[key]);

        if (this.lastDraw !== str) {
            this.stream.cursorTo(0);
            this.stream.write(str);
            this.stream.clearLine(1);
            this.lastDraw = str;
        }
    }
    update(ratio?:any, tokens?:any) {
        var goal = Math.floor(ratio * this.total);
        var delta = goal - this.curr;

        this.tick(delta, tokens);
    }
    interrupt(message?:any) {
        // clear the current line
        this.stream.clearLine();
        // move the cursor to the start of the line
        this.stream.cursorTo(0);
        // write the message text
        this.stream.write(message);
        // terminate the line after writing the message
        this.stream.write('\n');
        // re-display the progress bar with its lastDraw
        this.stream.write(this.lastDraw);
    }

    terminate() {
        if (this.clear) {
            if (this.stream.clearLine) {
                this.stream.clearLine();
                this.stream.cursorTo(0);
            }
        } else {
            this.stream.write('\n');
        }
    }
}