class Time{
    static deltaTime = 1;

    static update(){
        Time.deltaTime = 1.0 / max(1.0, frameRate());
    }
}