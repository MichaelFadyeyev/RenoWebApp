<?php


 class Worker{

    private $id;
    private $spec;

    public function __construct($id, $spec)
    {
        $this->id = $id;
        $this->spec = $spec;
    }
    

    public function getId()
    {
        return $this->id;
    }

    public function setId($id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getSpec()
    {
        return $this->spec;
    }

    public function setSpec($spec): self
    {
        $this->spec = $spec;
        return $this;
    }
}