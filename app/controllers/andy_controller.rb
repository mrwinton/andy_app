class AndyController < ApplicationController

  # POST andy/process
  def process(args)

    # Upload and write the image
    name = params[:upload][:file].original_filename
    directory = "public/images/upload"
    path = File.join(directory, name)
    File.open(path, "wb") { |f| f.write(params[:upload][:file].read) }

    byebug

    # scale the image
    resized_name = "resized_" + name
    resized_path = File.join(directory, resized_name)
    `convert #{path} -resize '1680x1200' #{resized_path}`

    # setup paths
    current_path = `pwd`
    image_path = current_path.strip + "/" + resized_path
    docker_image_path = "/host" + image_path
    docker_container = ENV["DOCKER_CONTAINER"]

    # Detect Andy
    output = `docker exec #{docker_container} /root/openface/demos/classifier.py infer /root/openface/generated-embeddings/classifier.pkl #{docker_image_path}`

    # result
    # puts output
    flash[:notice] = output
    redirect_to "/"
  end

end
