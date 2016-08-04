
function risto_ai(risto) {
    this.risto = risto;
    this.state = 0;
    this.controls = {
        'f': 0,
        'b': 0,
        'l': 0,
        'r': 0
    };
    this.think = function() {
        
        // Check if idle
        var idle = true;
        if(this.controls.f != this.risto.currentControls.f) idle = false;
        if(this.controls.b != this.risto.currentControls.b) idle = false;
        if(this.controls.l != this.risto.currentControls.l) idle = false;
        if(this.controls.r != this.risto.currentControls.r) idle = false;
        
        // Bumped into something
        if(this.risto.getSensorStatus("bumper")) {
            this.state = 1;
            
            // Reverse
            this.controls.f = 0;
            this.controls.b = 1;
            this.controls.l = 0;
            this.controls.r = 0;
            this.risto.drive({
                'controls': this.controls,
                'timeout': 500 // 0.5 seconds
            });
        
        // Just bumped into something
        } else if(this.state == 1 && idle) {
            this.state = 2;
            
            // Turn around
            this.controls.f = 0;
            this.controls.b = 0;
            this.controls.l = 0;
            this.controls.r = 1;
            this.risto.drive({
                'controls': this.controls,
                'timeout': 2000 // 2 seconds
            });
        
        // Normal forward driving
        } else if(this.risto.currentControls.timeout <= 0) {
            this.state = 0;
            
            // Drive forward
            this.controls.f = 1;
            this.controls.b = 0;
            this.controls.l = 0;
            this.controls.r = 0;
            this.risto.drive({
                'controls': this.controls,
                'timeout': 10000 // 10 seconds
            });
        }
    }
}