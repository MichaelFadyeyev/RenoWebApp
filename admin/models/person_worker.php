<?php

class PersonWorker extends Worker{
    private $name;
    private $contact;
    private $state;

    public function __construct($id, $spec, $name, $contact, $state)
    {
        parent::__construct($id, $spec);
        $this->name = $name;
        $this->contact = $contact;
        $this->state = $state;
    }

    /**
     * Get the value of name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     */
    public function setName($name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of contact
     */
    public function getContact()
    {
        return $this->contact;
    }

    /**
     * Set the value of contact
     */
    public function setContact($contact): self
    {
        $this->contact = $contact;

        return $this;
    }



    /**
     * Get the value of state
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set the value of state
     */
    public function setState($state): self
    {
        $this->state = $state;

        return $this;
    }
}