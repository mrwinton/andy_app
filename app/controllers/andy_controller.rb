require 'RMagick'

class AndyController < ApplicationController

  # POST andy/process
  def process(args)

    # Upload and write the image
    name = params[:upload][:file].original_filename
    directory = "public/images/upload"
    path = File.join(directory, name)
    File.open(path, "wb") { |f| f.write(params[:upload][:file].read) }

    # scale the image
    resized_name = "resized_" + name
    resized_path = File.join(directory, resized_name)
    `convert #{path} -resize '1200x720' #{resized_path}`

    # setup paths
    current_path = `pwd`
    image_path = current_path.strip + "/" + resized_path
    docker_image_path = "/host" + image_path
    docker_container = ENV["DOCKER_CONTAINER"]

    # Detect Andy
    output = `docker exec #{docker_container} /root/openface/demos/classifier.py infer /root/openface/generated-embeddings/classifier.pkl #{docker_image_path}`

    # result
    # puts output
    #flash[:notice] = output

    split_output = output.split("\n")
    coords = []
    name = ''
    confidence = 1
    image = Magick::Image.read(resized_path).first
    gc = Magick::Draw.new

    split_output.each do |line|
      if line.starts_with?('Left')
        coords = line.split(' ')
      elsif line.starts_with?('Predict')
        split = line.split(' ')
        name = split[1]
        confidence = split[3].to_f * 100
        gc.stroke = 'rgb(250,14,106)'
        gc.fill = 'none'
        gc.rectangle coords[1], coords[5], coords[3] ,coords[7]
        gc.font_family('sans')
        gc.pointsize(16)

        if(name.eql?("Andy"))
          gc.text(coords[1], coords[5].to_i - 30, confidence.to_s + "% Confident that we found your Fone")
        else
          gc.text(coords[1], coords[5].to_i - 30, confidence.to_s + "% Confident that this is not your Fone")
        end

      end
    end
    gc.draw(image)
    image.write resized_path


    redirect_to "/"
  end

end
